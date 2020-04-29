import React from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text, Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';
import FollowButton from 'components/common/FollowButton';
import Tag from 'components/common/Tag';
import { schedule_search } from 'lib/constants';

const { AVATAR_SIZE } = schedule_search;

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
      stores
    } = this.props;

    const styles = stores.appStyles.scheduleSearch;
    const isAuth = (isPublic || isFollowing) && !isOwner;
    
    return (
      <TouchableRipple style={styles.itemContainer} onPress={this._onPress}>
        <View style={styles.itemContent}>
          <UserAvatar
            size={AVATAR_SIZE}
            name={name}
            style={styles.itemAvatar}
            src={pictureUrl}
          />
          <View style={styles.itemBody}>
            <View style={styles.nameRow}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemName}>{name}</Text>
            </View>
            { Boolean(description || topic) && <Caption numberOfLines={1} ellipsizeMode="tail" style={styles.itemDescription}>{topic || description}</Caption> }
            <View style={styles.itemFooter}>
              { isClosed && <Tag status="Closed" /> }
            </View>
          </View>
          {
            isAuth && (
              <FollowButton
                id={id}
                name={name}
                isFollowing={isFollowing}
                small
              />
            )
          }
        </View>
      </TouchableRipple>
    );
  }
}

export default inject("stores")(observer(Item));