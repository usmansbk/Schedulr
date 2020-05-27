import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Caption } from 'react-native-paper';
import getImageUrl from 'helpers/getImageUrl';
import UserAvatar from '../UserAvatar';
import styles from './styles';

export default class Avatar extends React.Component {
  state = {
    username: '',
    email: '',
    pictureUrl: null,
    loading: false
  };

  static defaultProps = {
    username: '',
    email: '',
    pictureUrl: null
  };

  onPress = () => this.props.onPress();

  render() {
    const {
      name,
      email,
      pictureUrl,
      avatar
    } = this.props;

    const uri = avatar ? getImageUrl(avatar) : pictureUrl;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.onPress}
      >
        <View style={styles.content}>
          <UserAvatar
            size={60}
            name={name || email}
            style={styles.avatar}
            src={uri}
            onPress={this.onPress}
          />
          <View style={styles.text}>
            { name && <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>{name}</Text>}
            <Caption numberOfLines={1} ellipsizeMode="tail" >{email}</Caption>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}