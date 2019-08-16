import React from 'react';
import moment from 'moment';
import isEqual from 'lodash.isequal';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import ImageIcon from 'components/common/ImageIcon';
import Details from './Details';
import { formatDate, getRepeatLabel } from 'lib/time';
import { isEventValid, isEventCancelled, getDuration, getStatus } from 'lib/parseItem';
import capitalizr, {decapitalize} from 'lib/capitalizr';
import { ONE_TIME_EVENT } from 'lib/constants';

const DATE_FORMAT = "ddd DD, MMM YYYY, hh:mm a";
const FONT_SIZE = 24;

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
  
//  shouldComponentUpdate = (nextProps) => !isEqual(nextProps.event, this.props.event);

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
      navigateToBanner,
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
      banner,
      author
    } = event;
    const start = refStartAt || startAt;
    const end = refEndAt || endAt;
    const isValid = isEventValid({
      isCancelled, endAt: end,
      startAt: start,
      cancelledDates
    });

    const colors = stores.themeStore.colors;
    const styles = stores.appStyles.styles;
    
    return (
      <>
        <Appbar.Header style={styles.header}  collapsable>
          <Appbar.Action
            onPress={handleBack}
            icon={() => <Icon
              color={colors.gray}
              size={FONT_SIZE}
              name="arrow-left"
            />}
          />
          {
            (banner || isOwner) && (
              <Appbar.Action
                size={FONT_SIZE}
                color={colors.gray}
                icon={({ size, color }) => <ImageIcon
                  name="image"
                  size={24}
                  color={color}
                  banner={banner}
                />}
                onPress={() => navigateToBanner(id)}
              />
            )
          }
          <Appbar.Content titleStyle={styles.headerColor} />
          {
            isOwner && (
              <>
                <Appbar.Action
                  size={FONT_SIZE}
                  color={colors.gray}
                  icon={({ size, color }) => <Icon
                    name="trash-2"
                    size={size}
                    color={color}
                  />}
                  onPress={handleDelete}
                />
                <Appbar.Action
                  size={FONT_SIZE}
                  color={colors.gray}
                  icon={({ color, size }) => <Icon
                    size={size}
                    name="copy"
                    color={color}
                  />}
                  onPress={handleRepeat}
                />
                {
                  isValid && (
                    <>
                      <Appbar.Action
                        size={FONT_SIZE}
                        color={colors.gray}
                        icon={({ color, size }) => <Icon
                          size={size}
                          name="edit-3"
                          color={color}
                        />}
                        onPress={() => handleEdit({
                          id,
                          refStartAt: start,
                          refEndAt: end
                        })}
                      />
                      <Appbar.Action
                        size={FONT_SIZE}
                        color={colors.gray}
                        icon={({ color, size }) => <Icon
                          name="x"
                          color={color}
                          size={size}
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
            cancelledDates,
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
          banner={banner}
          isOwner={isOwner}
          isValid={isValid}
          isCancelled={isEventCancelled({ cancelledDates, isCancelled, startAt: start })}
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