import React from 'react';
import {
  View,
  ScrollView,
  Text,
  RefreshControl,
  Image
} from 'react-native';
import {
  Headline,
  TouchableRipple,
  FAB,
  Caption
} from 'react-native-paper';
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
      navigation.push('UserSchedules', {
        id,
        name,
      });
    }
  };

  // _toCreatedTab = () => {
  //   const { user, navigation } = this.props;
  //   if (user) {
  //     const { id, name } = user; 
  //     navigation.push('UserSchedules', {
  //       id,
  //       name,
  //       toCreatedTab: true
  //     });
  //   }
  // };

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
          <Image
            source={{uri: uriSmall}}
            resizeMode="cover"
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
        <View style={styles.link}>
          <Icon size={16} style={styles.linkIcon} name="calendar" color={stores.themeStore.colors.black} />
          <Caption style={styles.linkLabel} numberOfLines={1} ellipsizeMode="tail">{I18n.get("PROFILE_joined")(date)}</Caption>
        </View>   
        {
          !!bio && (      
            <View style={styles.link}>
              <Caption style={styles.linkLabel} numberOfLines={4} ellipsizeMode="tail">{bio}</Caption>
            </View>
          )
        }
        {
          website && (
            <View style={styles.link}>
              <Icon size={16} style={styles.linkIcon} name="link-2" color={stores.themeStore.colors.black} />
              <Hyperlink linkStyle={styles.linkStyle} linkDefault={true}>
                <Caption style={styles.linkLabel} numberOfLines={1} ellipsizeMode="tail">{website}</Caption>
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
                theme={{
                  colors: {
                    accent: colors.primary_dark
                  }
                }}
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
