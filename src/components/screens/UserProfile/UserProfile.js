import React from 'react';
import {View, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import {Headline, FAB, Caption, Appbar, Text} from 'react-native-paper';
import Icon from 'components/common/Icon';
import Hyperlink from 'react-native-hyperlink';
import {inject, observer} from 'mobx-react';
import numeral from 'numeral';
import {I18n} from 'aws-amplify';
import {format} from 'lib/date';
import getImageUrl from 'helpers/getImageUrl';
import UserAvatar from 'components/common/UserAvatar';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import Suspense from 'components/common/Suspense';
import colors from 'config/colors';

class UserProfile extends React.Component {
  state = {
    display: false,
  };

  componentDidMount = () => {
    this.timer = setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  _toCreatedFollowingTab = () => {
    const {user, navigation} = this.props;
    if (user) {
      const {id, name} = user;
      navigation.navigate('UserSchedules', {
        id,
        name,
      });
    }
  };

  _goBack = () => this.props.navigation.goBack();

  _editProfile = () => this.props.navigation.navigate('EditProfile');

  _viewAvatar = () =>
    this.props.navigation.navigate('AvatarViewer', {id: this.props.user.id});

  render() {
    if (!this.state.display) return <Suspense />;

    const {loading, error, onRefresh, refreshing, user, stores} = this.props;

    if (loading && !user) return <Loading loading={loading} />;
    if (error && !user)
      return <Error onRefresh={onRefresh} loading={refreshing} />;
    if (!user) return <Error onRefresh={onRefresh} loading={refreshing} />;

    const {
      pictureUrl,
      avatar,
      me,
      name,
      website,
      bio,
      createdAt,
      followingCount = 0,
      createdCount = 0,
    } = user;

    const uriBig = avatar ? getImageUrl(avatar, 400) : pictureUrl;
    const date = format(createdAt, 'MMMM YYYY');
    const styles = stores.styles.profile;

    return (
      <>
        <Appbar.Header style={stores.styles.appStyles.header} collapsable>
          <Appbar.Action
            animated={false}
            onPress={this._goBack}
            size={24}
            color={stores.theme.colors.primary}
            icon={({size, color}) => (
              <Icon name="arrow-left" color={color} size={size} />
            )}
          />
        </Appbar.Header>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[stores.theme.colors.primary]}
              progressBackgroundColor={stores.theme.colors.bg}
            />
          }
          style={styles.container}>
          <View style={styles.header}>
            <UserAvatar
              src={uriBig}
              size={AVATAR_HEIGHT}
              name={name}
              onPress={this._viewAvatar}
            />
            <Headline
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.headline}>
              {name}
            </Headline>
          </View>
          {me && (
            <TouchableOpacity onPress={this._toCreatedFollowingTab}>
              <View style={styles.countRow}>
                <View style={styles.item}>
                  <Text style={styles.count}>
                    {numeral(followingCount).format('0a')}
                  </Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.label}>
                    {I18n.get('PROFILE_followingLabel')}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.count}>
                    {numeral(createdCount).format('0a')}
                  </Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.label}>
                    {I18n.get('PROFILE_createdLabel')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.body}>
            <View style={styles.link}>
              <Icon
                size={16}
                style={styles.linkIcon}
                name="calendar"
                color={stores.theme.colors.black}
              />
              <Caption
                style={styles.linkLabel}
                numberOfLines={1}
                ellipsizeMode="tail">
                {I18n.get('PROFILE_joined')(date)}
              </Caption>
            </View>
            {website && (
              <View
                style={[
                  styles.link,
                  {justifyContent: 'flex-start', alignItems: 'flex-start'},
                ]}>
                <Icon
                  size={16}
                  style={styles.linkIcon}
                  name="link"
                  color={stores.theme.colors.black}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  }}>
                  <Hyperlink
                    linkStyle={[styles.linkLabel, styles.linkStyle]}
                    linkDefault={true}>
                    {website}
                  </Hyperlink>
                </View>
              </View>
            )}
            {!!bio && (
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <Text style={styles.textLabel}>{I18n.get('ABOUT')}</Text>
                <Caption style={styles.value}>{bio}</Caption>
              </View>
            )}
          </View>
        </ScrollView>
        {me && (
          <FAB
            label={I18n.get('BUTTON_editProfile')}
            color={colors.white}
            onPress={this._editProfile}
            theme={{
              colors: {
                accent: colors.primary_dark,
              },
            }}
            style={styles.fab}
          />
        )}
      </>
    );
  }
}

export default inject('stores')(observer(UserProfile));

const AVATAR_HEIGHT = 140;
