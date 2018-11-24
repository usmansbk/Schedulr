import React from 'react';
import moment from 'moment';
import { View, ScrollView } from 'react-native';
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
  isPrivate,
  isAdmin,
  adminId,
  adminName,
  createdAt,
}) => (
  <React.Fragment>
    <Appbar.Header>
      <Appbar.BackAction onPress={goBack} />
      <Appbar.Content
        title="Group Info"
      />
      <Appbar.Action icon="more-vert" />
    </Appbar.Header>
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <UserAvater name={name} rounded size={AVATAR_SIZE} />
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <View style={styles.followers}>
        <Text style={styles.followersCount}>{followersCount}</Text>
        <Text style={styles.followersLabel}>Followers</Text>
        <Button mode="outlined">{`Follow${following ? 'ing' : ''}`}</Button>
      </View>
      <Divider />
      <View style={styles.space}>
        <Text style={styles.label}>PRIVACY</Text>
        <Text style={styles.value}>{isPrivate ? 'Private' : 'Public'}</Text>
      </View>
      <View style={styles.space}>
        <Text style={styles.label}>STATUS</Text>
        <Text style={styles.value}>{closed ? 'Closed' : 'Open'}</Text>
      </View>
      <View style={styles.space}>
        <Text style={styles.label}>CREATED ON</Text>
        <Text style={styles.value}>{moment(createdAt).format('ddd DD MMM, YYYY hh:mm a')}</Text>
      </View>
      <View style={styles.space}>
        <Text style={styles.label}>ABOUT</Text>
        <Text style={styles.value}>{description}</Text>
      </View>
      </View>
    </ScrollView>
  </React.Fragment>
);