import React from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text, Caption } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import styles, { AVATAR_SIZE } from './styles';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  _navigateToInfo = () => this.props.navigateToBoardInfo(this.props.id);
  render() {
    const {
      id,
      name,
      description,
      isClosed
    } = this.props;
    
    const isPending = id[0] === '-';
    const [ first, second ] = name.split(' ');
    const avatarName = `${first} ${second ? second : ''}`;

    return (
      <TouchableRipple style={styles.itemContainer} onPress={this._onPress}>
        <View style={styles.itemContent}>
          <TouchableRipple onPress={this._navigateToInfo} style={styles.itemAvatar}>
            <UserAvatar component={CachedImage} size={AVATAR_SIZE} name={avatarName} />
          </TouchableRipple>
          <View style={styles.itemBody}>
            <View style={styles.nameRow}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={isPending ? styles.offlineName : styles.itemName}>{name}</Text>
            </View>
            { Boolean(description) && <Caption numberOfLines={1} ellipsizeMode="tail" style={styles.itemDescription}>{description}</Caption> }
            <View style={styles.itemFooter}>
              { isClosed && <Caption style={styles.danger}>Closed</Caption> }
            </View>
          </View>
        </View>
      </TouchableRipple>
    );
  }
}