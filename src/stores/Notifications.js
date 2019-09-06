import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import moment from 'moment';

export default class AppState {
  @persist @observable lastSyncTimestamp = moment().unix();
  @persist @observable hasNotifications = false;

  @persist('list') @observable notifications = [];

  @action updateLastSyncTimestamp = () => this.lastSyncTimestamp = moment().unix();
  @action appendNotifications = newNotifications => this.notifications = this.notifications.concat(newNotifications);
  @action clearNotifications = () => this.notifications = [];

  @action reset() {
    this.notifications = [];
    this.lastSyncTimestamp = moment().unix();
  }

  @action setNotificationIndicator = status => this.hasNotifications = status;

  @computed get updates() {
    return this.notifications.filter(notif => notif.type !== 'Comment').sort((a, b) => -(a.timestamp - b.timestamp));
  }

  @computed get comments() {
    return this.notifications.filter(notif => notif.type === 'Comment').sort((a, b) => -(a.timestamp - b.timestamp));
  }
}