import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SimpleToast from 'react-native-simple-toast';
import { dark, light } from 'config/colors';

export default class SettingsState {
  @persist @observable language = "en_US";
  @persist @observable dark = false;
  @persist @observable sound = true;
  @persist @observable vibrate = true;
  @persist @observable disableReminders = false;
  @persist @observable headsUp = false;
  @persist @observable starredEventsOnly = false;
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

  @action reset() {
    this.language = "en_US";
    this.dark = false;
    this.sound = true;
    this.vibrate = true;
    this.disableReminders = false;
    this.headsUp = false;
    this.starredEventsOnly = false;
    this.disablePushNotifications = false;
  }
}