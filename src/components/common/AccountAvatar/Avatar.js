import React from 'react';
import { View } from 'react-native';
import { Text, Caption, TouchableRipple } from 'react-native-paper';
import UserAvatar from '../UserAvatar';
import styles from './styles';

export default ({
  name,
  email,
  pictureUrl,
  onPress
}) => (
  <TouchableRipple
    style={styles.container}
    onPress={onPress}
  >
    <View style={styles.content}>
      <UserAvatar
        size={80}
        name={name}
        style={styles.avatar}
        src={pictureUrl}
      />
      <View style={styles.text}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>{name}</Text>
        <Caption numberOfLines={1} ellipsizeMode="tail" >{email}</Caption>
      </View>
    </View>
  </TouchableRipple>
);
