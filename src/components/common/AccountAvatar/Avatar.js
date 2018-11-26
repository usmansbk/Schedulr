import React from 'react';
import { View } from 'react-native';
import { Text, Caption, TouchableRipple } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import styles from './styles';


const dummy = {
  name: 'Babakolo Usman Suleiman',
  email: 'usmansbk@gmail.com'
};

export default ({ name=dummy.name, email=dummy.email, }) => (
  <TouchableRipple
    onPress={() => alert('User profile')}
    style={styles.container}
  >
    <View style={styles.content}>
      <UserAvatar
        rounded
        size={80}
        name={name}
        style={styles.avatar}
      />
      <View style={styles.text}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>{name}</Text>
        <Caption numberOfLines={1} ellipsizeMode="tail" >{email}</Caption>
      </View>
    </View>
  </TouchableRipple>
);
