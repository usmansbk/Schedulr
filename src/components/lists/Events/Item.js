import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Text,
  Headline,
} from 'react-native-paper';
import Icon from 'components/common/Icon';
import { inject, observer } from 'mobx-react';
import Avatar from 'components/common/UserAvatar';
import Badge from 'components/common/Badge';
import ActionSheet from 'components/actionsheet/Event';
import { events, CALENDAR_TYPE } from 'lib/constants';
import {
  formatDate,
  getTime,
} from 'lib/time';
import {
  getStatus,
  getCategory,
} from 'lib/formatEvent';
import getImageUrl from 'helpers/getImageUrl';

class Item extends React.Component {
  _onPress = () => {
    if (this.props.__typename === CALENDAR_TYPE) {
      this.props.navigateToCalendarEvent(this.props.id);
    } else {
      this.props.onPressItem(this.props.id, this.props.from);
    }
  };
  _onLongPress = () => {
    this.ActionSheet &&
      this.ActionSheet.getWrappedInstance().wrappedInstance.showActionSheet();
  };
  _onMute = () => {
    this.props.stores.appState.toggleMute(this.props.id, this.props.eventScheduleId);
  };
  _navigateToBanner = () => {
    if (this.props.__typename === CALENDAR_TYPE) {
      this.props.navigateToCalendarEvent(this.props.id);
    } else {
      this.props.navigateToBanner(this.props.id);
    }
  };

  shouldComponentUpdate = (nextProps) => {
    return (
      nextProps.timerTick !== this.props.timerTick ||
      nextProps.updatedAt !== this.props.updatedAt ||
      nextProps.isOffline !== this.props.isOffline ||
      nextProps.isBookmarked !== this.props.isBookmarked ||
      nextProps.isMuted !== this.props.isMuted
    );
  };

  render() {
    const {
      id,
      title,
      startAt,
      endAt,
      _startAt,
      until,
      address,
      stores,
      banner,
      eventScheduleId,
      allDay,
      isMuted,
      isBookmarked,
      isOffline,
      cancelledDates,
      __typename
    } = this.props;

    const pictureUrl = banner && getImageUrl(banner);
    const category = getCategory(this.props.category);
    const time = getTime({
      allDay,
      startAt,
      endAt
    });
    const status = getStatus({
      cancelledDates,
      startAt,
      _startAt,
      endAt,
      until
    });
    
    const styles = stores.appStyles.eventsList;
    
    return (
      <TouchableOpacity
        onPress={this._onPress}
        style={styles.itemContainer}
        onLongPress={this._onLongPress}
      >
        <View style={styles.itemContent}>
          <Avatar
            size={events.AVATAR_SIZE}
            name={title}
            src={pictureUrl}
            style={styles.left}
            onPress={this._navigateToBanner}
            badge={<Badge status={status} />}
            key={status}
          />
          <View style={styles.itemBody}>
            {
              (isOffline || isMuted) && <Icon
                style={styles.privateIcon}
                name={isMuted ? "mute" : "sync"}
                size={16}
                color={
                  isMuted ?
                  stores.themeStore.colors.light_red :
                  stores.themeStore.colors.light_gray_3
                }
              />
            }
            <Headline
              style={styles.itemHeadline}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Headline>
            <Text style={styles.time}>{time}</Text>
          </View>
          <ActionSheet
            id={id}
            title={title}
            category={category}
            date={formatDate(startAt, endAt, allDay)}
            address={address}
            isBookmarked={isBookmarked}
            startAt={startAt}
            isMuted={isMuted}
            isCalendarEvent={__typename === CALENDAR_TYPE}
            bookmarkScheduleId={eventScheduleId}
            ref={ref => this.ActionSheet = ref}
            onMute={this._onMute}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default inject("stores")(observer(Item));