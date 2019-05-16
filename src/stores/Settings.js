import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
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
    this[value] = !this[value]
  }

  @action toggleTheme () {
    this.dark = !this.dark;
  }

  @computed get colorTheme () {
    if (this.dark) return dark;
    return light;
  }
}