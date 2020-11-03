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
import {I18n} from 'aws-amplify';
import Suspense from 'components/common/Suspense';
import CancelConfirm from 'components/dialogs/CancelEvent';
import DeleteConfirm from 'components/dialogs/DeleteEvent';
import Details from './Details';
import {isEventValid} from 'lib/formatEvent';
import {nextEvent} from 'lib/calendar';
import getImageUrl from 'helpers/getImageUrl';
import logger from 'config/logger';

const FONT_SIZE = 24;

class EventDetails extends React.Component {
  state = {
    display: false,
  };

  _cancelRef = (ref) => (this.cancelConfirmRef = ref);
  _deleteRef = (ref) => (this.deleteConfirmRef = ref);
  _openCancelDialog = () =>
    this.cancelConfirmRef.getWrappedInstance().wrappedInstance.open();
  _openDeleteDialog = () => this.deleteConfirmRef.getWrappedInstance().open();

  _handleMute = () => {
    this.props.stores.appState.toggleMute(
      this.props.event.id,
      this.props.event.schedule.id,
    );
  };

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

  componentWillUnmount = () => {
    if (this.displayTimer) {
      clearTimeout(this.displayTimer);
    }
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
      isCancelled,
      cancelledDates,
      isPublic,
      isOffline,
      banner,
      author,
    } = nextEvent(event, from);
    const isValid = isEventValid({
      endAt,
      startAt,
      cancelledDates,
      isCancelled,
      recurrence,
      until,
    });

    const colors = stores.theme.colors;
    const styles = stores.styles.appStyles;
    const isMuted = stores.appState.isEventMuted(event.id, schedule?.id);
    const pictureUrl = banner && getImageUrl(banner, 320);
    const isFollowing = schedule?.isFollowing;

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
                optionsWrapper: {
                  backgroundColor: colors.menuBackground,
                },
                optionText: {
                  fontFamily: 'SemiBold',
                  color: colors.black,
                },
                optionWrapper: {
                  padding: 16,
                },
              }}>
              {isOwner && (
                <>
                  {isValid && (
                    <>
                      <MenuOption
                        onSelect={() =>
                          handleEdit({
                            id,
                            startAt,
                            endAt,
                          })
                        }
                        text={I18n.get('MENU_edit')}
                      />
                      <MenuOption
                        text={I18n.get('MENU_cancel')}
                        onSelect={this._openCancelDialog}
                      />
                    </>
                  )}
                  <MenuOption
                    text={I18n.get('MENU_delete')}
                    onSelect={this._openDeleteDialog}
                  />
                  <MenuOption
                    text={I18n.get('MENU_duplicate')}
                    onSelect={handleRepeat}
                  />
                </>
              )}
              <MenuOption
                text={I18n.get(`MENU${isMuted ? '_unmute' : '_mute'}`)}
                onSelect={this._handleMute}
              />
            </MenuOptions>
          </Menu>
        </Appbar.Header>
        <Details
          id={id}
          title={title}
          startAt={startAt}
          endAt={endAt}
          allDay={allDay}
          recurrence={recurrence}
          category={category}
          address={venue}
          isMuted={isMuted}
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
          isCancelled={isCancelled}
          cancelledDates={cancelledDates}
          navigateToSchedule={navigateToSchedule}
          navigateToComments={navigateToComments}
          navigateToUser={navigateToUser}
          navigateToBookmarks={navigateToBookmarks}
          navigateToBanner={navigateToBanner}
        />
        <CancelConfirm id={id} date={startAt} onRef={this._cancelRef} />
        <DeleteConfirm id={id} onRef={this._deleteRef} />
      </>
    );
  }
}

export default inject('stores')(observer(EventDetails));
