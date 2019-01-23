import React from 'react';
import moment from 'moment';
import isEqual from 'lodash.isequal';
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
import Loading from '../../common/Loading';
import Error from '../../common/Error';
import styles, { AVATAR_SIZE } from './styles';
import appStyles from '../../../config/styles';
import colors from '../../../config/colors';

export default class Info extends React.Component {
  shouldComponentUpdate = (nextProps) => !isEqual(nextProps.board, this.props.board);
  render() {
    const {
      board,
      loading,
      error,
      goBack,
      onRefresh,
      handleShare,
      handleSelectMenu,
      navigateToFollowers,
      navigateToProfile
    } = this.props;
    if (loading && !board) return <Loading />;
    if (error && !board) return <Error onRefresh={onRefresh} />;

    const {
      id,
      name,
      description,
      status,
      isFollowing,
      eventsCount,
      followersCount,
      createdAt,
      isPublic,
      isAuthor,
      author,
    } = board;
    const [ first, second ] = name.split(' ');
    const avatarName = `${first} ${second ? second : ''}`;
    const adminId = author && author.id;
    const adminName = author && author.name;
    const isClosed = status === 'CLOSED';

    return (
      <React.Fragment>
        <Appbar.Header collapsable style={appStyles.header}>
          <Appbar.BackAction color={colors.gray} onPress={goBack} />
          <Appbar.Content
            titleStyle={appStyles.headerColor}
          />
          <Appbar.Action
            icon="share"
            onPress={() => handleShare({ name, description, id})}
            color={colors.gray}
          />
          {
            isAuthor && (
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
                <View style={styles.countRow}>
                  <Text
                    style={styles.count}
                    onPress={() => navigateToFollowers(id, isAuthor)}
                  >
                    {numeral(followersCount).format('0a')} Follower{followersCount > 1 ? 's' : ''}
                  </Text>
                  <Text style={styles.middot}>{'  ·  '}</Text>
                  <Text style={styles.count}>
                    {numeral(eventsCount).format('0a')} Event{eventsCount > 1 ? 's' : ''}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.noteView}>
                <Icon name="visibility" size={18} />
                <Text style={styles.note}>{ isPublic ? 'Public' : 'Private'} board</Text>
              </View>
              {
                isClosed && (
                  <View style={styles.noteView}>
                    <Icon name="lock" size={18} />
                    <Text style={styles.note}>This board is closed</Text>
                  </View>
                )
              }
              <View style={styles.date}>
                <Text style={styles.byLine}>
                  Created on <Text style={styles.adminName}>{moment(createdAt).toDate().toDateString()}</Text>
                </Text>
              </View>
              <View style={styles.admin}>
                <UserAvater rounded size={32} name={adminName} src={author.pictureUrl}/>
                <Text style={styles.byLine}>
                  by <Text
                    onPress={() => navigateToProfile(adminId)}
                    style={styles.adminName}>{adminName}</Text>
                </Text>
              </View>
              {
                Boolean(description) && (
                  <Hyperlink linkStyle={styles.linkStyle} linkDefault={true}>
                    <Text style={styles.description}>{description}</Text>
                  </Hyperlink>
                )
              }
            </View>
          </View>
      </ScrollView>
      {
        !isAuthor && (<FollowButton isFollowing={isFollowing} />)
      }
      </React.Fragment>
    );
  }
}