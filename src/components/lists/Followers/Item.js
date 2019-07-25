import React from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';
import { followers_list } from 'lib/constants';

const { AVATAR_SIZE } = followers_list;

class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id);
  shouldComponentUpdate = () => false;
  
  render() {
    const {
      name,
      pictureUrl,
      stores
    } = this.props;
    
    const styles = stores.appStyles.followersList;

    return (
      <TouchableRipple onPress={this._onPress} style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <View style={styles.itemLeft}>
            <UserAvatar
              name={name}
              size={AVATAR_SIZE}
              src={pictureUrl}
            />
          </View>
          <View style={styles.itemRight}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>{name}</Text>
          </View>
        </View>
      </TouchableRipple>
    )
  }
}

export default inject("stores")(observer(Item));