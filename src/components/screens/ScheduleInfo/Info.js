import React from 'react';
import moment from 'moment';
import isEqual from 'lodash.isequal';
import {
  View,
  ScrollView,
  RefreshControl
} from 'react-native';
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
import { schedule_info, CIRCLE, SCHEDULE_CLOSED } from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';
import UserAvater from 'components/common/UserAvatar';
import FollowButton from 'components/common/FollowButton';
import Loading from 'components/common/Loading';
import Alert from 'components/dialogs/Alert';
import Error from 'components/common/Error';

const { AVATAR_SIZE } = schedule_info;

class Info extends React.Component {
  state = {
    showAboutPrivacyAlert: false
  };

  _showAboutPrivacyAlert = () => this.setState({ showAboutPrivacyAlert: true });
  _hideAlert = () => this.setState({ showAboutPrivacyAlert: false });
  _onDelete = () => this.props.handleSelectMenu('delete');
  _onEdit = () => this.props.handleSelectMenu('edit');

  shouldComponentUpdate = (nextProps, nextState) => (
    !isEqual(nextProps.schedule, this.props.schedule) ||
    nextProps.loading !== this.props.loading ||
    nextState.showAboutPrivacyAlert !== this.state.showAboutPrivacyAlert
  );

  render() {
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
      stores
    } = this.props;
    
    if (loading && !schedule) return <Loading />;
    if (error && !schedule) return <Error onRefresh={onRefresh} />;
    if (!schedule) return <Error
      icon="meh"
      message={I18n.get("ERROR_404")}
      caption={I18n.get("ERROR_404_caption")}
    />;

    const {
      id,
      name,
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
    const pictureUrl = author.avatar ? getImageUrl(author.avatar) : author.pictureUrl;

    const appStyles = stores.appStyles.styles;
    const styles = stores.appStyles.scheduleInfo;
    const colors = stores.themeStore.colors;
    const isAuth = (isPublic || isFollowing) && !isOwner;

    return (
      <>
        <Appbar.Header collapsable style={appStyles.header}>
          <Appbar.Action
            onPress={goBack}
            color={colors.gray}
            size={24}
            icon={({ size, color }) => <Icon
              name="arrow-left"
              size={size}
              color={color}
            />}
          />
          <Appbar.Content
            titleStyle={appStyles.headerColor}
          />
          <Appbar.Action
            size={24}
            color={colors.gray}
            icon={({ size, color }) => <Icon
              name="share-2"
              size={size}
              color={color}
            />}
            onPress={() => handleShare({ name, description, id})}
          />
          {
            !!isOwner && <>
              <Appbar.Action
                size={24}
                color={colors.gray}
                icon={({ size, color }) => <Icon
                  name="edit"
                  size={size}
                  color={color}
                />}
                onPress={this._onEdit}
              />
              <Appbar.Action
                size={24}
                color={colors.gray}
                icon={({ size, color }) => <Icon
                  name="trash"
                  size={size}
                  color={color}
                />}
                onPress={this._onDelete}
              />
            </>
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
                src={picture && getImageUrl(picture)}
                onPress={() => navigateToPicture(id)}
              />
              </View>
              <View style={styles.right}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.countRow}>
                  <Text
                    style={styles.count}
                    onPress={() => navigateToFollowers(id)}
                  >
                    {numeral(followersCount).format('0a')} {I18n.get(`SCHEDULE_followerCount${followersCount > 1 ? 's' : ''}`)}
                  </Text>
                  <Text style={styles.middot}>{` ${CIRCLE} `}</Text>
                  <Text
                    style={styles.count}
                    onPress={() => navigateToEvents(id)}
                  >
                    {numeral(eventsCount).format('0a')} {I18n.get(`SCHEDULE_eventsCount${eventsCount > 1 ? 's' : ''}`)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.noteView}>
                <Icon
                  color={colors.black}
                  name={`eye${isPublic ? '' : '-off'}`}
                  size={18}
                />
                <Text
                  style={styles.note}
                  onPress={this._showAboutPrivacyAlert}
                >{I18n.get(`SCHEDULE_${ isPublic ? 'public' : 'private'}`)}</Text>
              </View>
              {
                isClosed && (
                  <View style={styles.noteView}>
                    <Icon color={colors.black} name="slash" size={18} />
                    <Text style={styles.note}>{I18n.get("SCHEDULE_thisScheduleIsClosed")}</Text>
                  </View>
                )
              }
              <View style={styles.date}>
                <Text style={styles.byLine}>
                  {I18n.get("SCHEDULE_createdOn")} <Text style={styles.adminName}>{moment(createdAt).toDate().toDateString()}</Text>
                </Text>
              </View>
              <TouchableRipple onPress={() => navigateToProfile(ownerId)}>
                <View style={styles.admin} >
                  <UserAvater size={32} name={ownerName} src={pictureUrl}/>
                  <Text style={styles.byLine}>
                    {I18n.get("SCHEDULE_by")} <Text style={styles.adminName}>{ownerName}</Text>
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
      <Alert
        visible={this.state.showAboutPrivacyAlert}
        title={I18n.get(`SCHEDULE_FORM_${isPublic ? "public" : "private"}`)}
        message={I18n.get(`ALERT_${isPublic ? 'public' : 'private'}ScheduleA`)}
        handleDismiss={this._hideAlert}
      />
      {
        isAuth && (<FollowButton
          id={id}
          name={name}
          isFollowing={isFollowing}
        />)
      }
      </>
    );
  }
}

export default inject('stores')(observer(Info));