import React from 'react';
import moment from 'moment';
import isEqual from 'lodash.isequal';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import UserAvatar from 'components/common/UserAvatar';
import Details from './Details';
import { formatDate, getRepeatLabel, getDuration } from 'lib/time';
import { isEventValid, isEventCancelled, getStatus } from 'lib/parseItem';
import { ONE_TIME_EVENT } from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';
import logger from 'config/logger';

const DATE_FORMAT = "ddd DD, MMM YYYY, hh:mm a";
const FONT_SIZE = 24;

class EventDetails extends React.Component {
  state = {
    count: 0
  };
  _handleCancel = () => {
    const isRecurring = this.props.event.recurrence !== ONE_TIME_EVENT;
    this.props.handleCancel(isRecurring ? this.props.event.startAt : null);
  };
  _getDuration = (start, end) => getDuration(start, end);
 _incrementCount = () => this.setState(prev => ({ count: prev.count + 1 }));

 componentDidMount = () => logger.log('event_details_screen');

 shouldComponentUpdate = (nextProps, nextState) => (
   (this.state.count !== nextState.count) || !isEqual(nextProps.event, this.props.event)
 );

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
      navigateToBookmarks,
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
      bookmarksCount,
      commentsCount,
      isOwner,
      isCancelled,
      isBookmarked,
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
    const pictureUrl = banner && getImageUrl(banner);
    const isFollowing = schedule && schedule.isFollowing;

    const isAuth = isPublic || isFollowing || isOwner;
    
    return (
      <>
        <Appbar.Header style={styles.header} collapsable>
          <Appbar.Action
            onPress={handleBack}
            color={colors.primary}
            size={FONT_SIZE}
            icon={({ color, size }) => <Icon
              name="arrow-left"
              color={color}
              size={size}
            />}
          />
          <Appbar.Action
            key={pictureUrl}
            size={32}
            icon={({ size }) => <UserAvatar
              name={title}
              size={size}
              src={pictureUrl}
            />}
            onPress={() => navigateToBanner(id)}
          />
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
          status={getStatus({
            isCancelled,
            cancelledDates,
            startAt: start,
            endAt: end
          })}
          startAt={start}
          endAt={end}
          weekDay={moment(start).format('dddd')}
          firstAt={moment(startAt).format(DATE_FORMAT)}
          category={category}
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
          isAuth={isAuth}
          banner={banner}
          isOwner={isOwner}
          isValid={isValid}
          isCancelled={isEventCancelled({ cancelledDates, isCancelled, startAt: start })}
          navigateToSchedule={navigateToSchedule}
          navigateToComments={navigateToComments}
          navigateToUser={navigateToUser}
          navigateToBookmarks={navigateToBookmarks}
          cardView={cardView}
          count={this.state.count}
          onFinish={this._incrementCount}
        />
      </>
    )
  }
}

export default inject("stores")(observer(EventDetails));