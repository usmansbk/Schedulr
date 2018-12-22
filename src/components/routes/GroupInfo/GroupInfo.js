import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption
} from 'react-native-popup-menu';
import numeral from 'numeral';
import {
  Appbar,
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

export default class Info extends React.Component {
  static defaultProps = {
    id: 1,
    name: 'EEEN302',
    description: `In this guide we will set up our app to handle external URIs @usbkay. Let's suppose that we want a URI like http://www.google.com to open our app and link straight into a chat screen for some user named "Eric".`,
    isClosed: true,
    isPrivate: true,
    link: 'schdlr.com',
    isFollowing: false,
    isAdmin: false,
    followersCount: 2,
    createdAt: Date.now(),
    admin: {
      id: 2,
      name: 'Babakolo Usman Suleiman',
    }
  };

  render() {
    const {
      id,
      name,
      description,
      isClosed,
      isFollowing,
      followersCount,
      isPrivate,
      isAdmin,
      admin,
      goBack,
      handleShare,
      handleSelectMenu,
      navigateToFollowers,
      navigateToProfile,
    } = this.props;
    const [ first, second ] = name.split(' ');
    const avatarName = `${first} ${second ? second : ''}`;
    const adminId = admin && admin.id;
    const adminName = admin && admin.name;

    return (
      <React.Fragment>
        <Appbar.Header collapsable style={appStyles.header}>
          <Appbar.BackAction color={colors.gray} onPress={goBack} />
          <Appbar.Content
            title="Group Info"
            titleStyle={appStyles.headerColor}
          />
          <Appbar.Action
            icon="share"
            onPress={() => handleShare({ name, description, id})}
            color={colors.gray}
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
                  { !isClosed && (
                    <MenuOption value="close">
                      <Text style={styles.menuText}>Close</Text>
                    </MenuOption>
                  )}
                  { isClosed && (
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
        <ScrollView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.avatar}>
              <View style={styles.userAvatar}>
              <UserAvater
                name={avatarName}
                rounded
                component={CachedImage}
                size={AVATAR_SIZE}
              />
              </View>
              <View style={styles.right}>
                <Text style={styles.name}>{name}</Text>
                <Text
                  style={styles.followersCount}
                  onPress={() => navigateToFollowers(id)}
                >
                  {numeral(followersCount).format('0a')} Follower{followersCount > 1 ? 's' : ''}
                </Text>
                {
                  !isAdmin && (<FollowButton isFollowing={isFollowing} />)
                }
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.noteView}>
                <Icon name="visibility" size={18} />
                <Text style={styles.note}>This is a { isPrivate ? 'private' : 'public'} group</Text>
              </View>
              {
                isClosed && (
                  <View style={styles.noteView}>
                    <Icon name="lock" size={18} />
                    <Text style={styles.note}>This group is closed</Text>
                  </View>
                )
              }
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
  }
}