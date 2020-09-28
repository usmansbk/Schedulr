import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Caption} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';
import Badge from 'components/common/Badge';
import {schedules} from 'lib/constants';

const {AVATAR_SIZE} = schedules;

class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id);
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
      name,
      description,
      topic,
      pictureUrl,
      isClosed,
      authorPictureUrl,
      authorName,
      stores,
      isMuted,
      isOffline,
      isOwner,
    } = this.props;

    const styles = stores.styles.schedulesList;

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={this._onPress}>
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
          <View style={styles.itemBody}>
            <View style={styles.nameRow}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.itemName}>
                {name}
              </Text>
              {isMuted && !isClosed && (
                <Icon
                  name="mute"
                  size={18}
                  style={styles.muteIcon}
                  color={stores.theme.colors.light_red}
                />
              )}
              {(isClosed || isOffline) && (
                <Icon
                  style={styles.muteIcon}
                  name={isClosed ? 'archive' : 'sync'}
                  size={16}
                  color={stores.theme.colors.light_gray_3}
                />
              )}
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
        </View>
      </TouchableOpacity>
    );
  }
}

export default inject('stores')(observer(Item));
