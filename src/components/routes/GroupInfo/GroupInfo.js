import React from 'react';
import moment from 'moment';
import { View, ScrollView } from 'react-native';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption
} from 'react-native-popup-menu';
import {
  Appbar,
  Divider,
  Text
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserAvater from 'react-native-user-avatar';
import Hyperlink from 'react-native-hyperlink';
import FollowButton from '../../common/FollowButton';
import styles, { AVATAR_SIZE } from './styles';
import appStyles from '../../../config/styles';
import colors from '../../../config/colors';

export default ({
  goBack,
  handleSelectMenu,
  id,
  name,
  description,
  closed,
  isMember,
  membersCount,
  isPrivate,
  isAdmin,
  adminId,
  adminName,
  createdAt,
  navigateToMembers,
  navigateToProfile,
}) => (
  <React.Fragment>
    <Appbar.Header collapsable style={appStyles.header}>
      <Appbar.BackAction color={colors.gray} onPress={goBack} />
      <Appbar.Content
        title="Group Info"
        titleStyle={appStyles.headerColor}
      />
      {
        isAdmin && (
          <Menu onSelect={handleSelectMenu}>
            <MenuTrigger 
              customStyles={{
                triggerWrapper: styles.menuButton,
              }}
            >
              <Icon size={24} color={colors.gray} name="more-vert" />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption value="edit">
                <Text style={styles.menuText}>Edit</Text>
              </MenuOption>
              { !closed && (
                <MenuOption value="close">
                  <Text style={styles.menuText}>Close</Text>
                </MenuOption>
              )}
              { closed && (
                <MenuOption value="open">
                  <Text style={styles.menuText}>Open</Text>
                </MenuOption>
              )}
              <MenuOption value="delete">
                <Text style={styles.menuText}>Delete</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        )
      }
    </Appbar.Header>
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.header}>
        <UserAvater name={name} rounded size={AVATAR_SIZE} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.followers}>
        <Text
          style={styles.followersCount}
          onPress={() => navigateToMembers(id)}>{membersCount} Members</Text>
        {
          !isAdmin && (
            <FollowButton
              style={styles.followButton}
              mode="outlined"
              isMember={isMember}
            />
          )
        }
      </View>
      <Divider />
      <View style={styles.space}>
      <Text style={styles.label}>BY</Text>
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
        <Hyperlink linkStyle={styles.linkStyle} linkDefault={true}>
          <Text style={styles.value}>
            {description}
          </Text>
        </Hyperlink>
      </View>
      </View>
    </ScrollView>
  </React.Fragment>
);