import React from 'react';
import moment from 'moment';
import { View, ScrollView } from 'react-native';
import {
  Appbar,
  Divider,
  Text
} from 'react-native-paper';
import UserAvater from 'react-native-user-avatar';
import Hyperlink from 'react-native-hyperlink';
import FollowButton from '../../common/FollowButton';
import styles, { AVATAR_SIZE } from './styles';

export default ({
  goBack,
  id,
  name,
  description,
  closed,
  following,
  followersCount,
  isPrivate,
  isAdmin,
  adminId,
  adminName,
  createdAt,
  navigateToFollowers,
  navigateToProfile,
}) => (
  <React.Fragment>
    <Appbar.Header>
      <Appbar.BackAction onPress={goBack} />
      <Appbar.Content
        title="Group Info"
      />
      {
        isAdmin && (<Appbar.Action icon="more-vert" />)
      }
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
        <Text
          style={styles.followersLabel}
          onPress={() => navigateToFollowers(id)}>Followers</Text>
        {
          !isAdmin && (
            <FollowButton
              style={styles.followButton}
              mode="outlined"
              following={following}
            />
          )
        }
      </View>
      <Divider />
      <View style={styles.space}>
      <Text style={styles.label}>ADMIN</Text>
      <View style={styles.admin}>
        <UserAvater name={adminName} rounded size={32} />
        <Text onPress={() => navigateToProfile(adminId)} style={styles.adminName}>{adminName}</Text>
      </View>
      </View>
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
        <Hyperlink linkStyle={ { color: '#2980b9', fontSize: 20 } } linkDefault={true}>
          <Text style={styles.value}>
            {description}
          </Text>
        </Hyperlink>
      </View>
      </View>
    </ScrollView>
  </React.Fragment>
);