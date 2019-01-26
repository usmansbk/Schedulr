import React from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text, Paragraph, Caption } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import styles, { AVATAR_SIZE, PRIMARY } from './styles';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  _navigateToInfo = () => this.props.navigateToBoardInfo(this.props.id);
  render() {
    const {
      id,
      name,
      description,
      isClosed,
      isPublic
    } = this.props;
    
    const [ first, second ] = name.split(' ');
    const boardName = `${first} ${second ? second : ''}`;
    const isOffline = id[0] === '-';

    return (
      <TouchableRipple style={styles.itemContainer} onPress={this._onPress}>
        <View style={styles.itemContent}>
          <TouchableRipple onPress={this._navigateToInfo} style={styles.itemAvatar}>
            <UserAvatar component={CachedImage} size={AVATAR_SIZE} rounded name={boardName} />
          </TouchableRipple>
          <View style={styles.itemBody}>
            <View style={styles.nameRow}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={isOffline ? styles.offlineName : styles.itemName}>{name}</Text>
            </View>
            { Boolean(description) && <Caption numberOfLines={1} ellipsizeMode="tail" style={styles.itemDescription}>{description}</Caption> }
            <View style={styles.itemFooter}>
              { isClosed && <Caption style={styles.danger}>Closed</Caption> }
              { isClosed && !isPublic && <Caption> · </Caption>}
              { !isPublic && <Caption style={styles.danger}>Private</Caption> }
            </View>
          </View>
        </View>
      </TouchableRipple>
    );
  }
}