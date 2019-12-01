import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import moment from 'moment';
import gql from 'graphql-tag';
import { getNotifications } from 'api/queries';
import client from 'config/client';

export default class Notifications {
  @persist @observable count = 0;
  @persist @observable lastSyncTimestamp = moment().unix();
  @persist @observable hasUpdates = false;
  @observable filter = 'all';
  @observable loading = false;

  @persist('list') @observable allNotifications = [];

  @action updateLastSyncTimestamp = (timestamp) => {
    if (timestamp) this.lastSyncTimestamp = timestamp;
    else this.lastSyncTimestamp = moment().unix() + 2;
  };

  @action appendNotifications = newNotifications => {
    if (newNotifications.length) {
      this.count += newNotifications.length;
      this.allNotifications = this.allNotifications.concat(newNotifications.map(notif => Object.assign(notif, { seen: false })));
    }
  };
  
  @action markAsSeen = () => {
    this.allNotifications = this.allNotifications.map(notif => {
      if (!notif.seen) notif.seen = true;
      return notif;
    });
  };

  @action clearNotifications = () => {
    this.allNotifications = [];
    this.filter = 'all';
    this.resetCounter(0);
  };
  @action resetCounter = (temp=0) => this.count = temp;
  
  @action increment = () => this.count += 1;
  
  @action decrement = () => this.count -= 1;

  @action reset() {
    this.clearNotifications();
    this.lastSyncTimestamp = moment().unix();
  }

  @computed get updates() {
    if (this.filter === 'all') {
      return this.allNotifications.sort((a, b) => (b.timestamp - a.timestamp));
    }
    return this.allNotifications.filter(notif => notif.type === this.filter).sort((a, b) => (b.timestamp - a.timestamp));
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

  @action fetchNotifications = () => {
    if (!this.loading) {
      this.loading = true;
      client.query({
        fetchPolicy: 'network-only',
        query: gql(getNotifications),
        variables: {
          lastSync: String(this.lastSyncTimestamp)
        }
      }).then((result) => {
        const { data: { notifications }={} } = result || {};
        if (notifications && notifications.length) {
          this.appendNotifications(notifications);
          const latest = notifications.sort((a, b) => b.timestamp - a.timestamp)[0];
          this.updateLastSyncTimestamp(latest.timestamp);
        }
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    }
  };
}