import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Caption} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';
import ActionSheet from 'components/actionsheet/Schedule';
import Badge from 'components/common/Badge';
import {schedules} from 'lib/constants';

const {AVATAR_SIZE} = schedules;

class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id);
  _onLongPress = () => {
    this.ActionSheet && this.ActionSheet.getWrappedInstance().showActionSheet();
  };
  _onMute = () => {
    this.props.stores.appState.toggleMuteSchedule(
      this.props.id,
      this.props.isMuted,
    );
  };
  _navigateToInfo = () => this.props.navigateToScheduleInfo(this.props.id);
  shouldComponentUpdate = (nextProps) => {
    return (
      this.props.updatedAt !== nextProps.updatedAt ||
      this.props.isOffline !== nextProps.isOffline ||
      this.props.isMuted !== nextProps.isMuted
    );
  };

  render() {
    const {
      id,
      name,
      description,
      topic,
      pictureUrl,
      isClosed,
      authorPictureUrl,
      authorName,
      stores,
      isMuted,
      isFollowing,
      isOffline,
      isOwner,
    } = this.props;

    const styles = stores.styles.schedulesList;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={this._onPress}
        onLongPress={this._onLongPress}>
        <View style={styles.itemContent}>
          <UserAvatar
            onPress={this._navigateToInfo}
            size={AVATAR_SIZE}
            src={pictureUrl}
            name={name}
            style={styles.itemAvatar}
            badge={
              !isOwner && <Badge src={authorPictureUrl} name={authorName} />
            }
          />
          {(isClosed || isOffline) && (
            <Icon
              style={styles.privateIcon}
              name={isClosed ? 'archive' : 'sync'}
              size={16}
              color={stores.theme.colors.light_gray_3}
            />
          )}
          <View style={styles.itemBody}>
            <View style={styles.nameRow}>
              {isMuted && (
                <Icon
                  name="mute"
                  size={18}
                  style={styles.muteIcon}
                  color={stores.theme.colors.light_red}
                />
              )}
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.itemName}>
                {name}
              </Text>
            </View>
            {Boolean(description || topic) && (
              <Caption
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.itemDescription}>
                {topic || description}
              </Caption>
            )}
          </View>
          <ActionSheet
            id={id}
            title={name}
            isMuted={isMuted}
            isFollowing={isFollowing}
            ref={(ref) => (this.ActionSheet = ref)}
            onMute={this._onMute}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default inject('stores')(observer(Item));
