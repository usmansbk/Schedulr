import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import moment from 'moment';

export default class Notifications {
  @persist @observable count = 0;
  @persist @observable lastSyncTimestamp = moment().unix();
  @persist @observable hasNotifications = false;

  @persist('list') @observable notifications = [];

  @action updateLastSyncTimestamp = () => this.lastSyncTimestamp = moment().unix();

  @action appendNotifications = newNotifications => {
    if (newNotifications.length) {
      this.count = newNotifications.length;
      this.notifications = this.notifications.concat(newNotifications);
    }
  };

  @action clearNotifications = () => this.notifications = [];
  @action resetCounter = () => this.count = 0;

  @action reset() {
    this.clearNotifications();
    this.lastSyncTimestamp = moment().unix();
  }

  @action setNotificationIndicator = status => this.hasNotifications = status;

  @computed get updates() {
    return this.notifications.sort((a, b) => -(a.timestamp - b.timestamp));
  }

  @computed get comments() {
    return this.notifications.filter(notif => notif.type === 'Comment').sort((a, b) => -(a.timestamp - b.timestamp));
  }

}