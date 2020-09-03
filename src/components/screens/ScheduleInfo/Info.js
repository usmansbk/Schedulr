import React from 'react';
import moment from 'moment';
import uuidv5 from 'uuid/v5';
import {View, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import numeral from 'numeral';
import {Appbar, Text} from 'react-native-paper';
import Icon from 'components/common/Icon';
import Hyperlink from 'react-native-hyperlink';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import {schedule_info, SCHEDULE_CLOSED} from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';
import UserAvatar from 'components/common/UserAvatar';
import FollowButton from 'components/common/FollowButton';
import Loading from 'components/common/Loading';
import Alert from 'components/dialogs/Alert';
import Error from 'components/common/Error';
import Suspense from 'components/common/Suspense';

const {AVATAR_SIZE} = schedule_info;

class Info extends React.Component {
  state = {
    display: false,
  };

  _aboutPrivacyRef = (ref) => (this.aboutPrivacyRef = ref);
  _showAboutPrivacyAlert = () => this.aboutPrivacyRef.open();
  _onDelete = () =>
    this.props.handleSelectMenu(
      'delete',
      this.props.schedule.picture && this.props.schedule.picture.key,
    );
  _onEdit = () => this.props.handleSelectMenu('edit');
  _onArchive = () =>
    this.props.handleSelectMenu(
      this.props.schedule.status === SCHEDULE_CLOSED ? 'open' : 'close',
    );

  componentDidMount = () => {
    setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
  };

  shouldComponentUpdate = (nextProps, nextState) =>
    nextState.display !== this.state.display ||
    nextProps.schedule.updatedAt !== this.props.schedule.updatedAt ||
    nextProps.schedule.isFollowing !== this.props.schedule.isFollowing ||
    nextProps.loading !== this.props.loading;

  render() {
    if (!this.state.display) return <Suspense />;

    const {
      schedule,
      loading,
      error,
      goBack,
      onRefresh,
      handleShare,
      navigateToFollowers,
      navigateToProfile,
      navigateToEvents,
      navigateToPicture,
      stores,
    } = this.props;

    if (loading && !schedule) return <Loading loading={loading} />;
    if (error && !schedule)
      return <Error onRefresh={onRefresh} loading={loading} />;
    if (!schedule)
      return (
        <Error
          notFound
          message={I18n.get('ERROR_404')}
          caption={I18n.get('ERROR_404_caption')}
        />
      );

    const {
      id,
      name,
      topic,
      description,
      status,
      picture,
      eventsCount,
      followersCount,
      createdAt,
      isPublic,
      isOwner,
      isFollowing,
      author,
    } = schedule;

    const ownerId = author && author.id;
    const ownerName = author && author.name;
    const isClosed = status === SCHEDULE_CLOSED;

    const styles = stores.styles.scheduleInfo;
    const colors = stores.theme.colors;
    // const isAuth = (isPublic || isFollowing) && !isOwner;
    const isPersonal = id === uuidv5(stores.appState.userId, uuidv5.DNS);

    return (
      <>
        <Appbar.Header collapsable style={stores.styles.appStyles.header}>
          <Appbar.Action
            animated={false}
            onPress={goBack}
            color={colors.primary}
            size={24}
            icon={({size, color}) => (
              <Icon name="arrow-left" size={size} color={color} />
            )}
          />
          <Appbar.Content titleStyle={stores.styles.headerColor} />
          {(isPublic || isOwner) && (
            <Appbar.Action
              animated={false}
              size={24}
              color={colors.primary}
              icon={({size, color}) => (
                <Icon name="share" size={size} color={color} />
              )}
              onPress={() => handleShare({name, description, id})}
            />
          )}
          {isOwner && (
            <Menu>
              <MenuTrigger
                customStyles={{
                  triggerWrapper: {
                    padding: 16,
                  },
                }}>
                <Icon name="menu" color={colors.primary} size={24} />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsWrapper: {
                    backgroundColor: colors.menuBackground,
                  },
                  optionText: {
                    fontFamily: 'SemiBold',
                    color: colors.black,
                  },
                  optionWrapper: {
                    padding: 16,
                  },
                }}>
                {!isClosed && (
                  <MenuOption
                    text={I18n.get('MENU_edit')}
                    onSelect={this._onEdit}
                  />
                )}
                {!isPersonal && (
                  <>
                    <MenuOption
                      text={I18n.get(
                        `MENU_${isClosed ? 'unarchive' : 'archive'}`,
                      )}
                      onSelect={this._onArchive}
                    />
                    <MenuOption
                      text={I18n.get('MENU_delete')}
                      onSelect={this._onDelete}
                    />
                  </>
                )}
              </MenuOptions>
            </Menu>
          )}
        </Appbar.Header>
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              colors={[stores.theme.colors.primary]}
              progressBackgroundColor={stores.theme.colors.bg}
            />
          }>
          <View style={styles.container}>
            <View style={styles.head}>
              <UserAvatar
                name={name}
                size={AVATAR_SIZE}
                src={picture && getImageUrl(picture)}
                onPress={() => navigateToPicture(id)}
                style={styles.avatar}
              />
              <Text style={styles.name}>{name}</Text>
              <View style={styles.noteView}>
                <Icon
                  color={colors.black}
                  name={`eye${isPublic ? 'o' : ''}`}
                  size={18}
                />
                <Text style={styles.note} onPress={this._showAboutPrivacyAlert}>
                  {I18n.get(`SCHEDULE_${isPublic ? 'public' : 'private'}`)}
                </Text>
              </View>
              {isClosed && (
                <View style={styles.noteView}>
                  <Icon color={colors.black} name="archive" size={18} />
                  <Text style={styles.note}>
                    {I18n.get('SCHEDULE_thisScheduleIsClosed')}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.countRow}>
              <TouchableOpacity onPress={() => navigateToEvents(id)}>
                <View style={styles.item}>
                  <Text style={styles.count}>
                    {numeral(eventsCount).format('0a')}
                  </Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.label}>
                    {I18n.get(
                      `SCHEDULE_eventsCount${eventsCount > 1 ? 's' : ''}`,
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateToFollowers(id)}>
                <View style={styles.item}>
                  <Text style={styles.count}>
                    {numeral(followersCount).format('0a')}
                  </Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.label}>
                    {I18n.get(
                      `SCHEDULE_followerCount${followersCount > 1 ? 's' : ''}`,
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.body}>
              {Boolean(topic) && (
                <View style={stores.styles.eventDetails.item}>
                  <Text style={stores.styles.eventDetails.label}>
                    {I18n.get('TOPIC')}
                  </Text>
                  <Text style={stores.styles.eventDetails.value}>{topic}</Text>
                </View>
              )}
              <View style={stores.styles.eventDetails.item}>
                <Text style={stores.styles.eventDetails.label}>
                  {I18n.get('CREATED')}
                </Text>
                <Text style={stores.styles.eventDetails.value}>
                  {moment(createdAt).toDate().toDateString()}
                </Text>
              </View>
              <TouchableOpacity onPress={() => navigateToProfile(ownerId)}>
                <View style={stores.styles.eventDetails.item}>
                  <Text style={stores.styles.eventDetails.label}>
                    {I18n.get('AUTHOR')}
                  </Text>
                  <Text style={stores.styles.eventDetails.value}>
                    {ownerName}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={stores.styles.eventDetails.item}>
              <Text style={stores.styles.eventDetails.label}>
                {I18n.get('ABOUT')}
              </Text>
              <Hyperlink linkStyle={styles.linkStyle} linkDefault={true}>
                <Text style={styles.description}>
                  {description || I18n.get('EVENT_noDescription')}
                </Text>
              </Hyperlink>
            </View>
          </View>
        </ScrollView>
        <Alert
          title={I18n.get(`SCHEDULE_${isPublic ? 'public' : 'private'}`)}
          message={I18n.get(
            `ALERT_${isPublic ? 'public' : 'private'}ScheduleA`,
          )}
          ref={this._aboutPrivacyRef}
        />
        {!isOwner && (
          <FollowButton id={id} name={name} isFollowing={isFollowing} />
        )}
      </>
    );
  }
}

export default inject('stores')(observer(Info));
