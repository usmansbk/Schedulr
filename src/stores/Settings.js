import { observable } from 'mobx';

export default class SettingsState {
  @observable language = "en_US";
  @observable theme = 'light';
  @observable sound = true;
  @observable vibrate = true;
  @observable disableReminders = false;
  @observable headsUp = false;
  @observable starredEventsOnly = false;
  @observable disablePushNotifications = false;
  autoTheme = false;
}