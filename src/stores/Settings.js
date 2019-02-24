import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

const LIGHT = 'Light';
const DARK = 'Dark';

export default class SettingsState {
  @persist @observable language = "en_US";
  @persist @observable theme = LIGHT;
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
    if (this.theme === LIGHT)
      this.theme = DARK;
    else
      this.theme = LIGHT;
  }
}