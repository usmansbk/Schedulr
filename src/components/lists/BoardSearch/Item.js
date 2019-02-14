import React from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text, Caption } from 'react-native-paper';
import emojiRegex from 'emoji-regex';
import UserAvatar from '../../common/UserAvatar';
import FollowButton from '../../common/FollowButton';
import styles, { AVATAR_SIZE } from './styles';

export default class Item extends React.PureComponent {
  _onPress = () => {
    const cacheFirst = !(this.props.isAuthor || this.props.isFollowing);
    this.props.onPressItem(this.props.id, cacheFirst);
  };
  _navigateToInfo = () => this.props.navigateToBoardInfo(this.props.id);
  render() {
    const {
      id,
      name,
      description,
      isAuthor,
      isClosed,
      isFollowing,
    } = this.props;
    
    const isPending = id[0] === '-';
    const emojiMatch = emojiRegex().exec(name);
    let avatarName;
    if (emojiMatch) {
      avatarName = emojiMatch[0];
    } else {
      const [ first, second ] = name.split(' ');
      avatarName = `${first} ${second ? second : ''}`;
    }

    return (
      <TouchableRipple style={styles.itemContainer} onPress={this._onPress}>
        <View style={styles.itemContent}>
          <UserAvatar
            size={AVATAR_SIZE}
            name={avatarName}
            onPress={this._navigateToInfo}
            style={styles.itemAvatar}
          />
          <View style={styles.itemBody}>
            <View style={styles.nameRow}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={isPending ? styles.offlineName : styles.itemName}>{name}</Text>
            </View>
            { Boolean(description) && <Caption numberOfLines={1} ellipsizeMode="tail" style={styles.itemDescription}>{description}</Caption> }
            <View style={styles.itemFooter}>
              { isClosed && <Caption style={styles.danger}>Closed</Caption> }
            </View>
          </View>
          {
            !isAuthor && (
              <FollowButton
                id={id}
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