import React from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text, Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';
import UserAvatar from 'components/common/UserAvatar';
import FollowButton from 'components/common/FollowButton';
import { board_search } from 'lib/constants';

const { AVATAR_SIZE } = board_search;

@inject('stores')
@observer
export default class Item extends React.Component {
  _onPress = () => {
    const cacheFirst = (this.props.isAuthor || this.props.isFollowing);
    this.props.onPressItem(this.props.id, cacheFirst);
  };
  shouldComponentUpdate = (nextProps) => {
    return (
      this.props.name !== nextProps.name ||
      this.props.description !== nextProps.description ||
      this.props.isClosed !== nextProps.isClosed
    );
  };
  render() {
    const {
      id,
      name,
      description,
      isAuthor,
      isClosed,
      isFollowing,
      stores
    } = this.props;
    
    const isPending = id[0] === '-';

    const styles = stores.appStyles.boardSearch;
    
    return (
      <TouchableRipple style={styles.itemContainer} onPress={this._onPress}>
        <View style={styles.itemContent}>
          <UserAvatar
            size={AVATAR_SIZE}
            name={name}
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