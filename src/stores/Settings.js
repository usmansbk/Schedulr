import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import gql from 'graphql-tag';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SimpleToast from 'react-native-simple-toast';
import { dark, light } from 'config/colors';
import client from 'config/client';
import { togglePush } from 'api/mutations';

export default class SettingsState {
  @persist @observable language = "en";
  @persist @observable dark = false;
  @persist @observable sound = true;
  @persist @observable vibrate = true;
  @persist @observable disableReminders = false;
  @persist @observable headsUp = false;
  @persist @observable bookmarkedEventsOnly = false;
  @persist @observable disablePushNotifications = false;

  @action toggle (value) {
    this[value] = !this[value];
  }

  @action async toggleTheme () {
    this.dark = !this.dark;
    const colors = this.dark ? dark : light;
    try {
      SimpleToast.show("Applying theme... Just a sec!", SimpleToast.SHORT);
      await changeNavigationBarColor(this.dark ? colors.light_gray_2 : colors.bg, !this.dark);
    } catch (error) {}
  }

  @action async togglePush(id) {
    try {
      this.disablePushNotifications = !this.disablePushNotifications;
      const result = await client.mutate({
        mutation: gql(togglePush),
        optimisticResponse: {
          updateUser: {
            __typename: 'User',
            id,
            disablePush: this.disablePushNotifications
          } 
        },
        variables: {
          input: {
            id,
            disablePush: this.disablePushNotifications
          }
        }
      });
      const user = result.data && result.data.updateUser;
      if (user) {
        this.disablePushNotifications = user.disablePush;
      }
    } catch (error) {
      console.log(error);
    }
  }

  @action reset() {
    this.language = "en";
    this.dark = false;
    this.sound = true;
    this.vibrate = true;
    this.disableReminders = false;
    this.headsUp = false;
    this.bookmarkedEventsOnly = false;
    this.disablePushNotifications = false;
  }
}