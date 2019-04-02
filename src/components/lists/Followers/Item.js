import React from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import UserAvatar from 'components/common/UserAvatar';
import styles, { AVATAR_SIZE } from "./styles";

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  render() {
    const {
      name,
      pictureUrl
    } = this.props;
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