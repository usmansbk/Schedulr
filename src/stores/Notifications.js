import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import moment from 'moment';

export default class Notifications {
  @persist @observable count = 0;
  @persist @observable lastSyncTimestamp = moment().unix();
  @persist @observable hasNotifications = false;
  @observable filter = 'all';

  @persist('list') @observable allNotifications = [];

  @action updateLastSyncTimestamp = () => this.lastSyncTimestamp = moment().unix();

  @action appendNotifications = newNotifications => {
    if (newNotifications.length) {
      this.count += newNotifications.length;
      this.allNotifications = this.allNotifications.concat(newNotifications);
    }
  };

  @action clearNotifications = () => this.allNotifications = [];
  @action resetCounter = (temp) => this.count = temp;

  @action reset() {
    this.clearNotifications();
    this.count = 0;
    this.lastSyncTimestamp = moment().unix();
  }

  @action setNotificationIndicator = status => this.hasNotifications = status;

  @computed get updates() {
    if (this.filter === 'all') {
      return this.allNotifications.sort((a, b) => -(a.timestamp - b.timestamp));
    }
    return this.allNotifications.filter(notif => notif.type === this.filter).sort((a, b) => -(a.timestamp - b.timestamp));
  }

  @action handleFilterAction = (filter) => {
    switch(filter) {
      case 'clear':
        this.clearNotifications();
        break;
      default:
        this.filter = filter;
    }
  }

}