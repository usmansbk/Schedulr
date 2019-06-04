import React from 'react';
import moment from 'moment';
import isEqual from 'lodash.isequal';
import {
  View,
  ScrollView,
  RefreshControl,
  Alert
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
import { inject, observer } from 'mobx-react/native';
import UserAvater from 'components/common/UserAvatar';
import FollowButton from 'components/common/FollowButton';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import { board_info, CIRCLE, INFO } from 'lib/constants';

const { AVATAR_SIZE } = board_info;

@inject('stores')
@observer
export default class Info extends React.Component {
  shouldComponentUpdate = (nextProps) => (
    !isEqual(nextProps.board, this.props.board) ||
    nextProps.loading !== this.props.loading
  );
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
      stores
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
    const isOffline = id[0] === '-';
    const isClosed = status === 'CLOSED';

    const appStyles = stores.appStyles.styles;
    const styles = stores.appStyles.boardInfo;
    const colors = stores.themeStore.colors;

    return (
      <>
        <Appbar.Header collapsable style={appStyles.header}>
          <Appbar.BackAction color={colors.gray} onPress={goBack} />
          <Appbar.Content
            titleStyle={appStyles.headerColor}
          />
          {
            !isOffline && (
              <Appbar.Action
                icon="share"
                onPress={() => handleShare({ name, description, id})}
                color={colors.gray}
              />
            )
          }
          {
            isAuthor && !isOffline && (
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
          refreshControl={<RefreshControl
            onRefresh={onRefresh}
            refreshing={loading}
            colors={[colors.primary]}
            progressBackgroundColor={colors.bg}
          />}
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
                    onPress={() => navigateToEvents(id, (isFollowing || isAuthor))}
                  >
                    {numeral(eventsCount).format('0a')} Event{eventsCount > 1 ? 's' : ''}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.noteView}>
                <Icon color={colors.black} name="visibility" size={18} />
                <Text
                  style={styles.note}
                  onPress={() => {
                    if (isPublic) {
                      Alert.alert('Public board', INFO)
                    }
                  }}
                >{ isPublic ? 'Public' : 'Private'} board</Text>
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