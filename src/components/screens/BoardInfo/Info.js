import React from 'react';
import moment from 'moment';
import isEqual from 'lodash.isequal';
import {
  View,
  ScrollView,
  RefreshControl
} from 'react-native';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption
} from 'react-native-popup-menu';
import numeral from 'numeral';
import {
  Appbar,
  Text,
  TouchableRipple
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Hyperlink from 'react-native-hyperlink';
import UserAvater from '../../common/UserAvatar';
import FollowButton from '../../common/FollowButton';
import Loading from '../../common/Loading';
import Error from '../../common/Error';
import styles, { AVATAR_SIZE } from './styles';
import appStyles from '../../../config/styles';
import colors from '../../../config/colors';
import { CIRCLE } from '../../../lib/constants';

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
      navigateToProfile,
      navigateToEvents,
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

    const adminId = author && author.id;
    const adminName = author && author.name;
    const isClosed = status === 'CLOSED';

    return (
      <>
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
        <ScrollView
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={loading} />}
          style={styles.container}>
          <View style={styles.container}>
            <View style={styles.avatar}>
              <View style={styles.userAvatar}>
              <UserAvater
                name={name}
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
                  <Text style={styles.middot}>{` ${CIRCLE} `}</Text>
                  <Text
                    style={styles.count}
                    onPress={() => navigateToEvents(id)}
                  >
                    {numeral(eventsCount).format('0a')} Event{eventsCount > 1 ? 's' : ''}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.noteView}>
                <Icon color={colors.black} name="visibility" size={18} />
                <Text style={styles.note}>{ isPublic ? 'Public' : 'Private'} board</Text>
              </View>
              {
                isClosed && (
                  <View style={styles.noteView}>
                    <Icon color={colors.black} name="lock" size={18} />
                    <Text style={styles.note}>This board is closed</Text>
                  </View>
                )
              }
              <View style={styles.date}>
                <Text style={styles.byLine}>
                  Created on <Text style={styles.adminName}>{moment(createdAt).toDate().toDateString()}</Text>
                </Text>
              </View>
              <TouchableRipple onPress={() => navigateToProfile(adminId)}>
                <View style={styles.admin} >
                  <UserAvater size={32} name={adminName} src={author.pictureUrl}/>
                  <Text style={styles.byLine}>
                    by <Text style={styles.adminName}>{adminName}</Text>
                  </Text>
                </View>
              </TouchableRipple>
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
        !isAuthor && (<FollowButton
          isFollowing={isFollowing}
          id={id}
        />)
      }
      </>
    );
  }
}