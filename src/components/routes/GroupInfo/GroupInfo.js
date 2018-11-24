import React from 'react';
import { View } from 'react-native';
import {
  Appbar,
  Button,
  Divider,
  Text
} from 'react-native-paper';
import UserAvater from 'react-native-user-avatar';
import styles, { AVATAR_SIZE } from './styles';

export default ({
  goBack,
  id,
  name,
  description,
  link,
  closed,
  following,
  followersCount,
  isAdmin,
  adminId,
  adminName,
}) => (
  <React.Fragment>
    <Appbar.Header>
      <Appbar.BackAction onPress={goBack} />
      <Appbar.Content
        title="Group Info"
      />
      <Appbar.Action icon="more-vert" />
    </Appbar.Header>
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <UserAvater name={name} rounded size={AVATAR_SIZE} />
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    </View>
  </React.Fragment>
);