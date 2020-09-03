import React from 'react';
import {Appbar} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import Icon from 'components/common/Icon';
import Suspense from 'components/common/Suspense';
import CancelConfirm from 'components/dialogs/CancelEvent';
import Details from './Details';
import {update} from 'lib/calendar';
import {isEventValid} from 'lib/formatEvent';
import getImageUrl from 'helpers/getImageUrl';
import repeat from 'lib/repeat';
import logger from 'config/logger';

const FONT_SIZE = 24;

class EventDetails extends React.Component {
  state = {
    display: false,
  };

  _cancelRef = (ref) => (this.cancelConfirmRef = ref);
  _openCancelDialog = () =>
    this.cancelConfirmRef
      .getWrappedInstance()
      .wrappedInstance.wrappedInstance.open();

  componentDidMount = () => {
    this.displayTimer = setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
    logger.log('event_details_screen');
  };

  shouldComponentUpdate = (nextProps, nextState) =>
    nextState.display !== this.state.display ||
    nextProps.event.updatedAt !== this.props.event.updatedAt ||
    nextProps.event.isBookmarked !== this.props.event.isBookmarked ||
    nextProps.event.isOffline !== this.props.event.isOffline ||
    nextProps.event.commentsCount !== this.props.event.commentsCount;

  render() {
    if (!this.state.display) return <Suspense />;
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
      stores,
    } = this.props;
    const recur = repeat(event.startAt)
      .span(event.endAt)
      .every(event.recurrence)
      .until(event.until)
      .from(from);
    const currentEvent = update(event, recur.nextDate(), recur.nextSpan());
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
      isBookmarked,
      cancelledDates,
      isPublic,
      isOffline,
      banner,
      author,
      raw_startAt,
    } = currentEvent;
    const isValid = isEventValid({
      endAt,
      startAt,
      cancelledDates,
      recurrence,
      until,
    });

    const colors = stores.theme.colors;
    const styles = stores.styles.appStyles;
    const pictureUrl = banner && getImageUrl(banner, 320);
    const isFollowing = schedule && schedule.isFollowing;

    const isAuth = isPublic || isFollowing || isOwner;

    return (
      <>
        <Appbar.Header style={styles.header} collapsable>
          <Appbar.Action
            animated={false}
            onPress={handleBack}
            color={colors.primary}
            size={FONT_SIZE}
            icon={({color, size}) => (
              <Icon name="arrow-left" color={color} size={size} />
            )}
          />
          <Appbar.Content titleStyle={styles.headerColor} />
          {isOwner && (
            <Menu>
              <MenuTrigger
                customStyles={{
                  triggerWrapper: {
                    padding: 16,
                  },
                }}>
                <Icon name="menu" size={FONT_SIZE} color={colors.primary} />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionText: {
                    fontFamily: 'SemiBold',
                  },
                  optionWrapper: {
                    padding: 16,
                  },
                }}>
                <MenuOption
                  onSelect={() =>
                    handleEdit({
                      id,
                      startAt,
                      endAt,
                    })
                  }
                  text="Edit"
                />
                {isValid && (
                  <MenuOption text="Cancel" onSelect={this._openCancelDialog} />
                )}
                <MenuOption text="Duplicate" onSelect={handleRepeat} />
              </MenuOptions>
            </Menu>
          )}
        </Appbar.Header>
        <Details
          id={id}
          title={title}
          startAt={startAt}
          raw_startAt={raw_startAt}
          endAt={endAt}
          allDay={allDay}
          recurrence={recurrence}
          category={category}
          address={venue}
          isPublic={isPublic}
          isOffline={isOffline}
          publicSchedule={schedule && schedule.isPublic}
          scheduleName={schedule && schedule.name}
          scheduleId={schedule && schedule.id}
          authorId={author.id}
          authorName={author.name}
          until={until}
          createdAt={createdAt}
          updatedAt={updatedAt !== createdAt && updatedAt}
          description={description}
          isBookmarked={isBookmarked}
          bookmarksCount={bookmarksCount || 0}
          commentsCount={commentsCount || 0}
          pictureUrl={pictureUrl}
          isAuth={isAuth}
          banner={banner}
          isOwner={isOwner}
          cancelledDates={cancelledDates}
          navigateToSchedule={navigateToSchedule}
          navigateToComments={navigateToComments}
          navigateToUser={navigateToUser}
          navigateToBookmarks={navigateToBookmarks}
          navigateToBanner={navigateToBanner}
        />
        <CancelConfirm id={id} date={startAt} onRef={this._cancelRef} />
      </>
    );
  }
}

export default inject('stores')(observer(EventDetails));
