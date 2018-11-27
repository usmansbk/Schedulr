import React from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text, Paragraph } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import styles, { AVATAR_SIZE } from './styles';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  _navigateToInfo = () => this.props.navigateToGroupInfo(this.props.id);
  render() {
    const {
      name,
      description,
      closed,
    } = this.props;
    return (
      <TouchableRipple style={styles.itemContainer} onPress={this._onPress}>
        <View style={styles.itemContent}>
          <TouchableRipple onPress={this._navigateToInfo} style={styles.itemAvatar}>
            <UserAvatar component={CachedImage} size={AVATAR_SIZE} rounded name={name} />
          </TouchableRipple>
          <View style={styles.itemBody}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemName}>{name}</Text>
            <Paragraph numberOfLines={1} ellipsizeMode="tail" style={styles.itemDescription}>{description}</Paragraph>
            { closed && <Text style={styles.danger}>Closed</Text> }
          </View>
        </View>
      </TouchableRipple>
    );
  }
}