import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Caption} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';
import Avatar from 'components/common/UserAvatar';
import Badge from 'components/common/Badge';
import {events, CALENDAR_TYPE} from 'lib/constants';
import {getTime} from 'lib/time';
import {getStatus} from 'lib/formatEvent';
import getImageUrl from 'helpers/getImageUrl';

class Item extends React.Component {
  _onPress = () => {
    if (this.props.__typename === CALENDAR_TYPE) {
      this.props.navigateToCalendarEvent(this.props.id);
    } else {
      this.props.onPressItem(this.props.id, this.props.from);
    }
  };
  _onMute = () => {
    this.props.stores.appState.toggleMute(
      this.props.id,
      this.props.eventScheduleId,
    );
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
      nextProps.isMuted !== this.props.isMuted
    );
  };

  render() {
    const {
      title,
      startAt,
      endAt,
      until,
      stores,
      banner,
      isMuted,
      isOffline,
      isCancelled,
      cancelledDates,
      category,
      from,
    } = this.props;

    const pictureUrl = banner && getImageUrl(banner);
    const time = getTime({
      startAt,
      endAt,
      from,
    });
    const status = getStatus({
      cancelledDates,
      isCancelled,
      startAt,
      endAt,
      until,
    });

    const styles = stores.styles.eventsList;

    return (
      <TouchableOpacity onPress={this._onPress} style={styles.itemContainer}>
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={styles.itemHeadline}
                numberOfLines={1}
                ellipsizeMode="tail">
                {title}
              </Text>
              {(isOffline || isMuted) && (
                <Icon
                  name={isMuted ? 'mute' : 'sync'}
                  size={16}
                  color={
                    isMuted
                      ? stores.theme.colors.light_red
                      : stores.theme.colors.light_gray_3
                  }
                />
              )}
            </View>
            <Text style={styles.time}>{time}</Text>
            <Caption>{category}</Caption>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default inject('stores')(observer(Item));
