import React from 'react';
import { View } from 'react-native';
import { Text, Caption, TouchableRipple } from 'react-native-paper';
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
      pictureUrl
    } = this.props;

    return (
      <TouchableRipple
        style={styles.container}
        onPress={this.onPress}
      >
        <View style={styles.content}>
          <UserAvatar
            size={60}
            name={name || email}
            style={styles.avatar}
            src={pictureUrl}
          />
          <View style={styles.text}>
            { name && <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>{name}</Text>}
            <Caption numberOfLines={1} ellipsizeMode="tail" >{email}</Caption>
          </View>
        </View>
      </TouchableRipple>
    );
  }
}