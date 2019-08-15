import React from 'react';
import {
  View,
  StyleSheet,
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
import { I18n } from 'aws-amplify';
import UserAvatar from 'components/common/UserAvatar';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import colors from 'config/colors';

class UserProfile extends React.Component {
  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();

  _showPicture = () => this.props.navigation.navigate('AvatarViewer', {
    id: this.props.user.id,
  });

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
      me,
      name,
      website,
      followingCount=0,
      createdCount=0
    } = user;

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
        contentContainerStyle={styles.header}>
        <FastImage
          source={{uri: pictureUrl}}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.backgroundImage}
        />
        <View style={styles.image}>
          <UserAvatar
            src={pictureUrl}
            size={AVATAR_HEIGHT}
            name={name}
            onPress={this._showPicture}
          />
        </View>
        <Headline numberOfLines={2} ellipsizeMode="tail" style={styles.headline}>{name}</Headline>
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
        {
          website && (
            <View style={styles.link}>
              <Icon style={styles.linkIcon} name="link" color={colors.white} />
              <Hyperlink linkStyle={styles.linkStyle} linkDefault={true}>
                <Caption numberOfLines={1} ellipsizeMode="tail">{website}</Caption>
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

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303030'
  },
  avatar: {
    width: AVATAR_HEIGHT,
    height: AVATAR_HEIGHT,
  },
  image: {
    width: AVATAR_HEIGHT,
    height: AVATAR_HEIGHT,
    borderRadius: AVATAR_HEIGHT / 2,
    borderWidth: 4,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5
  },
  headline: {
    fontWeight: 'bold',
    fontFamily: 'sans-serif-bold',
    textAlign: 'center',
    color: colors.white
  },
  count: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 8,
    marginBottom: 4
  },
  label: {
    color: colors.white,
    fontSize: 16,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: 'blue'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  link: {
    marginVertical: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkStyle: {
    color: colors.primary_light,
  },
  linkIcon: {
    paddingRight: 8
  }
})