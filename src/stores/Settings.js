import { observable, action } from 'mobx';

const LIGHT = 'Light';
const DARK = 'Dark';

export default class SettingsState {
  @observable language = "en_US";
  @observable theme = LIGHT;
  @observable sound = true;
  @observable vibrate = true;
  @observable disableReminders = false;
  @observable headsUp = false;
  @observable starredEventsOnly = false;
  @observable disablePushNotifications = false;

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