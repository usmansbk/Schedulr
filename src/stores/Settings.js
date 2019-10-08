import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SimpleToast from 'react-native-simple-toast';
import { dark, light } from 'config/colors';
import { updateUserPushToken, toggleDisablePush } from 'helpers/updatePreference';

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

  @action updatePushToken = ({ os, token }) => {
    const key = `${os}Token`;
    updateUserPushToken(key, token);
  }

  @action async togglePush() {
    const toggled = this.userPreference ? !this.userPreference.disablePush : true;
    this.userPreference = {
      disablePush: toggled 
    };
    const response = await toggleDisablePush(toggled);
    this.setUserPreference(response);
  }

  @action setUserPreference = (pref) => {
    if (pref) this.userPreference = pref;
  };
}