import React from 'react';
import moment from 'moment';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Icon from 'components/common/Icon';
import Suspense from 'components/common/Suspense';
import DeleteConfirm from 'components/dialogs/DeleteEvent';
import CancelConfirm from 'components/dialogs/CancelEvent';
import Details from './Details';
import { formatDate, getRepeatLabel, getDuration } from 'lib/time';
import { update } from 'lib/calendar';
import { isEventValid, isEventCancelled } from 'lib/formatEvent';
import getImageUrl from 'helpers/getImageUrl';
import repeat from 'lib/repeat';
import logger from 'config/logger';

const DATE_FORMAT = "ddd DD, MMM YYYY, hh:mm a";
const DATE_ONLY_FORMAT = "ddd DD, MMM YYYY";
const FONT_SIZE = 24;

class EventDetails extends React.Component {
  state = {
    display: false,
    countDownExpire: 0
  };

  _cancelRef = ref => this.cancelConfirmRef = ref;
  _deleteRef = ref => this.deleteConfirmRef = ref;
  _openCancelDialog = () => this.cancelConfirmRef.wrappedInstance.wrappedInstance.open();
  _openDeleteDialog = () => this.deleteConfirmRef.getWrappedInstance().open();

  componentDidMount = () => {
    this.displayTimer = setTimeout(() => this.setState({
      display: true
    }), 0);
    logger.log('event_details_screen');
  };

 _onCountDownFinish = () => {
    this.setState(prev => ({
      countDownExpire: prev.countDownExpire + 1
    }));
  };

 shouldComponentUpdate = (nextProps, nextState) => (
   (nextState.display !== this.state.display) ||
   (nextState.countDownExpire !== this.state.countDownExpire) ||
   (nextProps.event.updatedAt !== this.props.event.updatedAt) ||
   (nextProps.event.isBookmarked !== this.props.event.isBookmarked) ||
   (nextProps.event.isOffline !== this.props.event.isOffline) ||
   (nextProps.event.commentsCount !== this.props.event.commentsCount)
 );

  render() {
    if (!this.state.display) return <Suspense/>;
    const {
      event,
      from,
      handleBack,
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
    const date = repeat(event.startAt)
                  .span(event.endAt)
                  .every(event.recurrence)
                  .until(event.until)
                  .from(from)
                  .nextDate();
    const currentEvent = date ? update(event, date) : event;
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
      isOffline,
      banner,
      author
    } = currentEvent;
    const isValid = isEventValid({
      isCancelled,
      endAt,
      startAt,
      cancelledDates
    });

    const colors = stores.themeStore.colors;
    const styles = stores.appStyles.styles;
    const pictureUrl = banner && getImageUrl(banner, 320);
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
          <Appbar.Content
            titleStyle={styles.headerColor}
          />
          {
            isOwner && (
              <>
                <Appbar.Action
                  size={FONT_SIZE}
                  color={colors.light_red}
                  icon={({ size, color }) => <Icon
                    name="trash"
                    size={size}
                    color={color}
                  />}
                  onPress={this._openDeleteDialog}
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
                          name="edit"
                          color={color}
                        />}
                        onPress={() => handleEdit({
                          id,
                          startAt,
                          endAt,
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
                        onPress={this._openCancelDialog}
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
          date={formatDate(startAt, endAt, allDay)}
          duration={getDuration(startAt, endAt)}
          startAt={startAt}
          endAt={endAt}
          category={category}
          address={venue}
          isPublic={isPublic}
          isOffline={isOffline}
          publicSchedule={schedule && schedule.isPublic}
          scheduleName={schedule && schedule.name}
          scheduleId={schedule && schedule.id}
          authorId={author.id}
          authorName={author.name}
          recurrence={getRepeatLabel(recurrence, startAt)}
          until={until && moment(until).format(DATE_ONLY_FORMAT)}
          createdAt={moment(createdAt).format(DATE_FORMAT)}
          updatedAt={(updatedAt !== createdAt) && moment(updatedAt).format(DATE_FORMAT)}
          description={description}
          isBookmarked={isBookmarked}
          bookmarksCount={bookmarksCount || 0}
          commentsCount={commentsCount || 0}
          pictureUrl={pictureUrl}
          isAuth={isAuth}
          banner={banner}
          isOwner={isOwner}
          isValid={isValid}
          isCancelled={isEventCancelled({ cancelledDates, isCancelled, startAt })}
          navigateToSchedule={navigateToSchedule}
          navigateToComments={navigateToComments}
          navigateToUser={navigateToUser}
          navigateToBookmarks={navigateToBookmarks}
          navigateToBanner={navigateToBanner}
          onCountDownFinish={this._onCountDownFinish}
          countDownReset={this.state.countDownExpire}
          cardView={cardView}
        />
        <DeleteConfirm
          id={id}
          banner={event.banner}
          onRef={this._deleteRef}
        />
        <CancelConfirm
          id={id}
          recurrence={recurrence}
          date={startAt}
          ref={this._cancelRef}
        />
      </>
    )
  }
}

export default inject("stores")(observer(EventDetails));