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
import Icon from 'react-native-vector-icons/Feather';
import Hyperlink from 'react-native-hyperlink';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import { schedule_info, CIRCLE } from 'lib/constants';
import UserAvater from 'components/common/UserAvatar';
import FollowButton from 'components/common/FollowButton';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';

const { AVATAR_SIZE } = schedule_info;

class Info extends React.Component {
  shouldComponentUpdate = (nextProps) => (
    !isEqual(nextProps.schedule, this.props.schedule) ||
    nextProps.loading !== this.props.loading
  );

  _aboutPrivacy = () => {
    const isPublic = this.props.schedule.isPublic;
    const title = I18n.get(`SCHEDULE_FORM_${isPublic ? "public" : "private"}`);
    const message = I18n.get(`ALERT_${isPublic ? 'public' : 'private'}ScheduleA`);

    Alert.alert(title, message);
  };


  render() {
    const {
      schedule,
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
    
    if (loading && !schedule) return <Loading />;
    if (error && !schedule) return <Error onRefresh={onRefresh} />;

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
      isOwner,
      author,
    } = schedule;

    const adminId = author && author.id;
    const adminName = author && author.name;
    const isOffline = id[0] === '-';
    const isClosed = status === 'CLOSED';

    const appStyles = stores.appStyles.styles;
    const styles = stores.appStyles.scheduleInfo;
    const colors = stores.themeStore.colors;

    return (
      <>
        <Appbar.Header collapsable style={appStyles.header}>
          <Appbar.Action
            onPress={goBack}
            icon={() => <Icon
              name="arrow-left"
              color={colors.gray}
              size={24}
            />}
          />
          <Appbar.Content
            titleStyle={appStyles.headerColor}
          />
          {
            !isOffline && (
              <Appbar.Action
                icon={() => <Icon
                  name="share-2"
                  size={24}
                  color={colors.gray}
                />}
                onPress={() => handleShare({ name, description, id})}
              />
            )
          }
          {
            isOwner && !isOffline && (
              <Menu onSelect={handleSelectMenu}>
                <MenuTrigger 
                  customStyles={{
                    triggerWrapper: styles.menuButton,
                  }}
                >
                  <Icon
                    size={24}
                    color={colors.gray}
                    name="more-vertical"
                  />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption value="edit">
                    <Text style={styles.menuText}>{I18n.get("MENU_edit")}</Text>
                  </MenuOption>
                  { !isClosed && (
                    <MenuOption value="close">
                      <Text style={styles.menuText}>{I18n.get("MENU_close")}</Text>
                    </MenuOption>
                  )}
                  { isClosed && (
                    <MenuOption value="open">
                      <Text style={styles.menuText}>{I18n.get("MENU_open")}</Text>
                    </MenuOption>
                  )}
                  <MenuOption value="delete">
                    <Text style={styles.menuText}>{I18n.get("MENU_delete")}</Text>
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
                    onPress={() => navigateToFollowers(id, isOwner)}
                  >
                    {numeral(followersCount).format('0a')} {I18n.get(`SCHEDULE_followerCount${followersCount > 1 ? 's' : ''}`)}
                  </Text>
                  <Text style={styles.middot}>{` ${CIRCLE} `}</Text>
                  <Text
                    style={styles.count}
                    onPress={() => navigateToEvents(id, (isFollowing || isOwner))}
                  >
                    {numeral(eventsCount).format('0a')} {I18n.get(`SCHEDULE_eventsCount${eventsCount > 1 ? 's' : ''}`)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.noteView}>
                <Icon color={colors.black} name="eye" size={18} />
                <Text
                  style={styles.note}
                  onPress={this._aboutPrivacy}
                >{I18n.get(`SCHEDULE_${ isPublic ? 'public' : 'private'}`)}</Text>
              </View>
              {
                isClosed && (
                  <View style={styles.noteView}>
                    <Icon color={colors.black} name="lock" size={18} />
                    <Text style={styles.note}>{I18n.get("SCHEDULE_thisScheduleIsClosed")}</Text>
                  </View>
                )
              }
              <View style={styles.date}>
                <Text style={styles.byLine}>
                  {I18n.get("SCHEDULE_createdOn")} <Text style={styles.adminName}>{moment(createdAt).toDate().toDateString()}</Text>
                </Text>
              </View>
              <TouchableRipple onPress={() => navigateToProfile(adminId)}>
                <View style={styles.admin} >
                  <UserAvater size={32} name={adminName} src={author.pictureUrl}/>
                  <Text style={styles.byLine}>
                    {I18n.get("SCHEDULE_by")} <Text style={styles.adminName}>{adminName}</Text>
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
        !isOwner && (<FollowButton
          isFollowing={isFollowing}
          id={id}
        />)
      }
      </>
    );
  }
}

export default inject('stores')(observer(Info));