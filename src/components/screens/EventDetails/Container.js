import React from 'react';
import moment from 'moment';
import isEqual from 'lodash.isequal';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import Details from './Details';
import { formatDate, getRepeatLabel } from 'lib/time';
import { isEventValid, isEventCancelled, getDuration, getStatus } from 'lib/parseItem';
import capitalizr, {decapitalize} from 'lib/capitalizr';
import { ONE_TIME_EVENT } from 'lib/constants';

const DATE_FORMAT = "ddd DD, MMM YYYY, hh:mm a";

class EventDetails extends React.Component {
  _handleCancel = () => {
    const isRecurring = this.props.event.recurrence !== ONE_TIME_EVENT;
    this.props.handleCancel(isRecurring ? this.props.event.startAt : null);
  };
  _getDuration = (start, end) => getDuration(start, end);
  _getStartAgo = (start, end) => {
    let timeAgo;
    if (moment().isBefore(moment(start))) {
      timeAgo = moment(start).fromNow(); 
    } else if (moment().isAfter(moment(end))) {
      timeAgo = moment(end).fromNow();
    } else {
      timeAgo = `${moment(end).fromNow(true)} left`;
    }
    return capitalizr(timeAgo);
  };
  
 shouldComponentUpdate = (nextProps) => !isEqual(nextProps.event, this.props.event);

  render() {
    const {
      event,
      refStartAt,
      refEndAt,
      handleBack,
      handleDelete,
      handleRepeat,
      handleEdit,
      navigateToSchedule,
      navigateToComments,
      navigateToUser,
      cardView,
      stores
    } = this.props;
    const {
      id,
      title,
      category,
      venue,
      startAt,
      endAt,
      allDay,
      schedule,
      recurrence,
      until,
      createdAt,
      updatedAt,
      description,
      isBookmarked,
      bookmarksCount,
      commentsCount,
      isOwner,
      isCancelled,
      cancelledDates,
      isPublic,
      author
    } = event;
    const start = refStartAt || startAt;
    const end = refEndAt || endAt;
    const isOffline = id[0] === '-';
    const isValid = isEventValid({ isCancelled, endAt: end, startAt: start, cancelledDates: cancelledDates || [] }) && !isOffline;

    const colors = stores.themeStore.colors;
    const styles = stores.appStyles.styles;
    
    return (
      <>
        <Appbar.Header style={styles.header}  collapsable>
          <Appbar.Action
            onPress={handleBack}
            icon={() => <Icon
              color={colors.gray}
              size={24}
              name="arrow-left"
            />}
          />
          <Appbar.Content titleStyle={styles.headerColor} />
          {
            isOwner && !isOffline && (
              <>
                <Appbar.Action
                  icon={() => <Icon
                    size={24}
                    name="trash"
                    color={colors.gray}
                  />}
                  onPress={handleDelete}
                />
                <Appbar.Action
                  icon={() => <Icon
                    size={24}
                    name="copy"
                    color={colors.gray}
                  />}
                  onPress={handleRepeat}
                />
                {
                  isValid && (
                    <>
                      <Appbar.Action
                        icon={() => <Icon
                          size={24}
                          name="edit-3"
                          color={colors.gray}
                        />}
                        onPress={() => handleEdit({
                          id,
                          refStartAt: start,
                          refEndAt: end
                        })}
                      />
                      <Appbar.Action
                        icon={() => <Icon
                          size={24}
                          name="x"
                          color={colors.gray}
                        />}
                        onPress={this._handleCancel}
                      />
                    </>
                  )
                }
              </>
            )
          }
        </Appbar.Header>
        <Details
          id={id}
          title={title}
          date={formatDate(start, end, allDay)}
          duration={this._getDuration(start, end)}
          timeAgo={this._getStartAgo(start, end)}
          status={getStatus({
            isCancelled,
            cancelledDates: cancelledDates || [],
            startAt: start,
            endAt: end
          })}
          startAt={start}
          weekDay={moment(start).format('dddd')}
          firstAt={moment(startAt).format(DATE_FORMAT)}
          category={decapitalize(category)}
          address={venue}
          isPublic={isPublic}
          publicSchedule={schedule && schedule.isPublic}
          scheduleName={schedule && schedule.name}
          scheduleId={schedule && schedule.id}
          authorId={author.id}
          authorName={author.name}
          recurrence={getRepeatLabel(recurrence, start)}
          until={until && moment(until).format(DATE_FORMAT)}
          createdAt={moment(createdAt).format(DATE_FORMAT)}
          updatedAt={(updatedAt !== createdAt) && moment(updatedAt).format(DATE_FORMAT)}
          description={description}
          isBookmarked={isBookmarked}
          bookmarksCount={bookmarksCount || 0}
          commentsCount={commentsCount || 0}
          isFollowing={schedule && schedule.isFollowing}
          isOwner={isOwner}
          isValid={isValid}
          isCancelled={isEventCancelled({ cancelledDates: cancelledDates || [], isCancelled, startAt: start })}
          navigateToSchedule={navigateToSchedule}
          navigateToComments={navigateToComments}
          navigateToUser={navigateToUser}
          cardView={cardView}
        />
      </>
    )
  }
}

export default inject("stores")(observer(EventDetails));