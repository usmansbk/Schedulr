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
import { CachedImage } from 'react-native-cached-image';
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <View style={styles.userAvatar}>
          <UserAvater
            name={name}
            rounded
            component={CachedImage}
            size={AVATAR_SIZE}
          />
          </View>
          <View style={styles.right}>
            <Text style={styles.name}>{name}</Text>
            <Text
              style={styles.membersCount}
              onPress={() => navigateToMembers(id)}
            >
              {membersCount} Members
            </Text>
            {
              !isAdmin && (<FollowButton isMember={isMember} />)
            }
          </View>
        </View>
        <Divider />
        <View style={styles.body}>
          <View style={styles.noteView}>
            <Icon name="visibility" size={18} />
            <Text style={styles.note}>This is a { isPrivate ? 'private' : 'public'} group</Text>
          </View>
          <View style={styles.admin}>
            <UserAvater rounded size={32} name={adminName}/>
            <Text
              onPress={() => navigateToProfile(adminId)}
              style={styles.adminName}>{adminName}</Text>
          </View>
          <Hyperlink linkStyle={styles.linkStyle} linkDefault={true}>
            <Text style={styles.description}>{description}</Text>
          </Hyperlink>
        </View>
      </View>
    </ScrollView>
  </React.Fragment>
);