import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Caption} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';
import FollowButton from 'components/common/FollowButton';
import Icon from 'components/common/Icon';
import {schedule_search} from 'lib/constants';

const {AVATAR_SIZE} = schedule_search;

class Item extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };
  shouldComponentUpdate = (nextProps) => {
    return (
      this.props.updatedAt !== nextProps.updatedAt ||
      this.props.isFollowing !== nextProps.isFollowing
    );
  };
  render() {
    const {
      id,
      name,
      description,
      topic,
      pictureUrl,
      isPublic,
      isOwner,
      isClosed,
      isFollowing,
      stores,
    } = this.props;

    const styles = stores.appStyles.scheduleSearch;
    const isAuth = (isPublic || isFollowing) && !isOwner;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={this._onPress} style={styles.itemContent}>
          <UserAvatar
            size={AVATAR_SIZE}
            name={name}
            style={styles.itemAvatar}
            src={pictureUrl}
            onPress={this._onPress}
          />
          {isClosed && (
            <Icon
              style={styles.rightIcon}
              name={isClosed ? 'archive' : 'cloud-off'}
              size={16}
              color={stores.themeStore.colors.light_gray_3}
            />
          )}
          <View style={styles.itemBody}>
            <View style={styles.nameRow}>
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
        </TouchableOpacity>
        {isAuth && (
          <FollowButton id={id} name={name} isFollowing={isFollowing} small />
        )}
      </View>
    );
  }
}

export default inject('stores')(observer(Item));
