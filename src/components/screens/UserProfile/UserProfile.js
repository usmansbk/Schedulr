import React from 'react';
import {
  View,
  ScrollView,
  Text,
  RefreshControl
} from 'react-native';
import {
  Headline,
  TouchableRipple,
  FAB,
  Caption
} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import Hyperlink from 'react-native-hyperlink';
import { inject, observer } from 'mobx-react';
import numeral from 'numeral';
import moment from 'moment';
import { I18n } from 'aws-amplify';
import getImageUrl from 'helpers/getImageUrl';
import UserAvatar from 'components/common/UserAvatar';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import colors from 'config/colors';

class UserProfile extends React.Component {

  _toFollowingTab = () => {
    const { user, navigation } = this.props;
    if (user) {
      const { id, name } = user; 
      navigation.push('UserSchedules', {
        id,
        name,
      });
    }
  };

  _toCreatedTab = () => {
    const { user, navigation } = this.props;
    if (user) {
      const { id, name } = user; 
      navigation.push('UserSchedules', {
        id,
        name,
        toCreatedTab: true
      });
    }
  };

  _editProfile = () => this.props.navigation.navigate('EditProfile');

  _viewAvatar = () => this.props.navigation.navigate('AvatarViewer', { id: this.props.user.id });

  render() {
    const {
      loading,
      error,
      onRefresh,
      refreshing,
      user,
      stores
    } = this.props;

    if (loading && !user) return <Loading />;
    if (error && !user) return <Error onRefresh={onRefresh} loading={refreshing} />;
    if (!user) return <Error onRefresh={onRefresh} loading={refreshing} />;
  
    const {
      pictureUrl,
      avatar,
      me,
      name,
      website,
      location,
      createdAt,
      followingCount=0,
      createdCount=0
    } = user;

    const uriSmall = avatar ? getImageUrl(avatar) : pictureUrl;
    const uriBig = avatar ? getImageUrl(avatar, 400) : pictureUrl;
    const date = moment(createdAt).format('MMMM YYYY');
    const styles = stores.appStyles.profile;
    
    return  (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[stores.themeStore.colors.primary]}
            progressBackgroundColor={stores.themeStore.colors.bg}
          />
        }
        contentContainerStyle={styles.container}>
        <View style={styles.header}>  
          <FastImage
            source={{uri: uriSmall}}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.backgroundImage}
          />  
          <View style={styles.image}> 
            <UserAvatar
              src={uriBig}
              size={AVATAR_HEIGHT}
              name={name}
              onPress={this._viewAvatar}
            />
          </View>
          <Headline numberOfLines={2} ellipsizeMode="tail" style={styles.headline}>{name}</Headline>
        </View>
        <View style={styles.countRow}>
          <TouchableRipple onPress={this._toFollowingTab}>
              <View style={styles.item}>
                <Text style={styles.count}>{numeral(followingCount).format('0a')}</Text>
                <Text style={styles.label}>{I18n.get("PROFILE_followingLabel")}</Text>
              </View>
          </TouchableRipple>
          <TouchableRipple onPress={this._toCreatedTab}>
            <View style={styles.item}>
              <Text style={styles.count}>{numeral(createdCount).format('0a')}</Text>
              <Text style={styles.label}>{I18n.get("PROFILE_createdLabel")}</Text>
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.link}>
          <Icon size={16} style={styles.linkIcon} name="calendar" color={stores.themeStore.colors.black} />
          <Caption style={styles.label}>{I18n.get("PROFILE_joined")(date)}</Caption>
        </View>   
        {
          !!location && (      
            <View style={styles.link}>
              <Icon size={16} style={styles.linkIcon} name="map-pin" color={stores.themeStore.colors.black} />
              <Caption style={styles.label} numberOfLines={1} ellipsizeMode="tail">{location}</Caption>
            </View>
          )
        }
        {
          website && (
            <View style={styles.link}>
              <Icon size={16} style={styles.linkIcon} name="link-2" color={stores.themeStore.colors.black} />
              <Hyperlink linkStyle={styles.linkStyle} linkDefault={true}>
                <Caption style={styles.label} numberOfLines={1} ellipsizeMode="tail">{website}</Caption>
              </Hyperlink>
            </View>
          )
        }
        {
          me && (
            <View style={styles.link}>
              <FAB
                label={I18n.get("BUTTON_editProfile")}
                color={colors.white}
                onPress={this._editProfile}
              />
            </View>
          )
        }
      </ScrollView>
    );
  }
}

export default inject("stores")(observer(UserProfile));

const AVATAR_HEIGHT = 120;
