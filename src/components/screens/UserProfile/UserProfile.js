import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl
} from 'react-native';
import { Headline, TouchableRipple } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { inject, observer } from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import numeral from 'numeral';
import colors from 'config/colors';

class UserProfile extends React.Component {
  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();

  _toFollowingTab = () => {
    const { user, stores, navigation } = this.props;
    if (user) {
      const { id, name } = user; 
      navigation.push('UserSchedules', {
        id,
        name,
        myProfile: stores.appState.userId === id,
      });
    }
  };

  _toCreatedTab = () => {
    const { user, stores, navigation } = this.props;
    if (user) {
      const { id, name } = user; 
      navigation.push('UserSchedules', {
        id,
        name,
        myProfile: stores.appState.userId === id,
        toCreatedTab: true
      });
    }
  };

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
      name,
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
          />
        </View>
        <Headline style={styles.headline}>{name}</Headline>
        <View style={styles.countRow}>
          <TouchableRipple onPress={this._toFollowingTab}>
              <View style={styles.item}>
                <Text style={styles.count}>{numeral(followingCount).format('0a')}</Text>
                <Text style={styles.label}>Following</Text>
              </View>
          </TouchableRipple>
          <TouchableRipple onPress={this._toCreatedTab}>
            <View style={styles.item}>
              <Text style={styles.count}>{numeral(createdCount).format('0a')}</Text>
              <Text style={styles.label}>Created</Text>
            </View>
          </TouchableRipple>
        </View>
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
  }
})