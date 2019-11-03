import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SimpleToast from 'react-native-simple-toast';
import OneSignal from 'react-native-onesignal';
import { dark, light } from 'config/colors';
import { toggleDisablePush } from 'helpers/updatePreference';

export default class SettingsState {
  @persist @observable language = "en";
  @persist @observable dark = false;
  @persist @observable sound = true;
  @persist @observable vibrate = true;
  @persist @observable disableReminders = false;
  @persist @observable headsUp = false;
  @persist @observable bookmarkedEventsOnly = false;
  @persist('object') @observable userPreference = null;

  @action toggle (value) {
    this[value] = !this[value];
  }

  @action async toggleTheme () {
    this.dark = !this.dark;
    const colors = this.dark ? dark : light;
    try {
      SimpleToast.show("Applying theme... Just a sec!", SimpleToast.SHORT);
      await changeNavigationBarColor(this.dark ? colors.light_gray_2 : colors.bg, !this.dark);
    } catch (error) {
      console.log(error.message);
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
    this.userPreference = null;
  }

  @action async togglePush() {
    const prev = this.userPreference;
    const toggled = prev ? !prev.disablePush : true;
    let optimisticResponse = {};
    if (prev) {
      optimisticResponse = Object.assign({}, prev, {
        disablePush: toggled
      });
      this.setUserPreference(optimisticResponse);
    }
    const updatedPreference = await toggleDisablePush(optimisticResponse);
    if (updatedPreference) this.setUserPreference(updatedPreference);
    OneSignal.setSubscription(!toggled);
  }

  @action setUserPreference = (pref) => {
    if (pref) {
      this.userPreference = pref;
      OneSignal.setSubscription(!pref.disablePush);
    }
  };
}