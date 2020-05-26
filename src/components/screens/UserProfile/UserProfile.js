import React from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Headline,
  TouchableRipple,
  FAB,
  Caption,
  Appbar,
  Text
} from 'react-native-paper';
import Icon from 'components/common/Icon';
import Hyperlink from 'react-native-hyperlink';
import { inject, observer } from 'mobx-react';
import numeral from 'numeral';
import moment from 'moment';
import { I18n } from 'aws-amplify';
import getImageUrl from 'helpers/getImageUrl';
import UserAvatar from 'components/common/UserAvatar';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import Suspense from 'components/common/Suspense';
import colors from 'config/colors';

class UserProfile extends React.Component {

  state = {
    display: false
  };

  componentDidMount = () => {
    setTimeout(() => this.setState({
      display: true
    }), 0);
  };

  _toCreatedFollowingTab = () => {
    const { user, navigation } = this.props;
    if (user) {
      const { id, name } = user; 
      navigation.navigate('UserSchedules', {
        id,
        name,
      });
    }
  };

  _goBack = () => this.props.navigation.goBack();

  _editProfile = () => this.props.navigation.navigate('EditProfile');

  _viewAvatar = () => this.props.navigation.navigate('AvatarViewer', { id: this.props.user.id });

  render() {
    if (!this.state.display) return <Suspense />;

    const {
      loading,
      error,
      onRefresh,
      refreshing,
      user,
      stores
    } = this.props;

    if (loading && !user) return <Loading loading={loading} />;
    if (error && !user) return <Error onRefresh={onRefresh} loading={refreshing} />;
    if (!user) return <Error onRefresh={onRefresh} loading={refreshing} />;
  
    const {
      pictureUrl,
      avatar,
      me,
      name,
      website,
      bio,
      createdAt,
      followingCount=0,
      createdCount=0
    } = user;

    const uriSmall = avatar ? getImageUrl(avatar) : pictureUrl;
    const uriBig = avatar ? getImageUrl(avatar, 400) : pictureUrl;
    const date = moment(createdAt).format('MMMM YYYY');
    const styles = stores.appStyles.profile;
    
    return  (
      <>
      <Appbar.Header style={stores.appStyles.styles.header} collapsable>
        <Appbar.Action
          onPress={this._goBack}
          size={24}
          color={stores.themeStore.colors.primary}
          icon={({ size, color }) => <Icon
            name="arrow-left"
            color={color}
            size={size}
          />}
        />
      </Appbar.Header>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[stores.themeStore.colors.primary]}
            progressBackgroundColor={stores.themeStore.colors.bg}
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
          <Headline numberOfLines={2} ellipsizeMode="tail" style={styles.headline}>{name}</Headline>
        </View>
        <TouchableRipple onPress={this._toCreatedFollowingTab}>
          <View style={styles.countRow}>
            <View style={styles.item}>
              <Text style={styles.count}>{numeral(followingCount).format('0a')}</Text>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.label}>{I18n.get("PROFILE_followingLabel")}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.count}>{numeral(createdCount).format('0a')}</Text>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.label}>{I18n.get("PROFILE_createdLabel")}</Text>
            </View>
          </View>
        </TouchableRipple>
        <View style={styles.body}>
          <View style={styles.link}>
            <Icon size={16} style={styles.linkIcon} name="calendar" color={stores.themeStore.colors.black} />
            <Caption style={styles.linkLabel} numberOfLines={1} ellipsizeMode="tail">{I18n.get("PROFILE_joined")(date)}</Caption>
          </View>   
          {
            website && (
              <View style={styles.link}>
                <Icon size={16} style={styles.linkIcon} name="link" color={stores.themeStore.colors.black} />
                <Hyperlink linkStyle={styles.linkStyle} linkDefault={true}>
                  <Caption style={styles.linkLabel} numberOfLines={1} ellipsizeMode="tail">{website}</Caption>
                </Hyperlink>
              </View>
            )
          }
          {
            !!bio && (      
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Text style={styles.textLabel}>{I18n.get("ABOUT")}</Text>
                <Caption style={styles.value}>{bio}</Caption>
              </View>
            )
          }
        </View>
      </ScrollView>
      {
        me && (
          <FAB
            label={I18n.get("BUTTON_editProfile")}
            color={colors.white}
            onPress={this._editProfile}
            theme={{
              colors: {
                accent: colors.primary_dark
              }
            }}
            style={styles.fab}
          />
        )
      }
      </>
    );
  }
}

export default inject("stores")(observer(UserProfile));

const AVATAR_HEIGHT = 140;
