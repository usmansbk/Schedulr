import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import moment from 'moment';
import gql from 'graphql-tag';
import { getNotifications } from 'api/queries';
import client from 'config/client';

const MIN_UPPER_BOUND_TIME = 2;

export default class Notifications {
  @persist @observable count = 0;
  @persist @observable lastSyncTimestamp = moment().unix();
  @persist @observable hasUpdates = false;
  @observable filter = 'all';
  @observable loading = false;

  @persist('list') @observable allNotifications = [];

  @action updateLastSyncTimestamp = () => this.lastSyncTimestamp = moment().unix();

  @action appendNotifications = newNotifications => {
    const uniqueNotifications = newNotifications.filter(
      notif => !(this.allNotifications.find(currentNotif => currentNotif.id === notif.id))
    );

    if (uniqueNotifications.length) {
      this.count += uniqueNotifications.length;
      this.allNotifications = this.allNotifications.concat(uniqueNotifications.map(notif => Object.assign(notif, { seen: false })));
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

  @action setUpdatesIndicator = status => this.hasUpdates = status;

  @computed get updates() {
    if (this.filter === 'all') {
      return this.allNotifications.sort((a, b) => -(a.timestamp - b.timestamp));
    }
    return this.allNotifications.filter(notif => notif.type === this.filter).sort((a, b) => -(a.timestamp - b.timestamp));
  }

  @computed get skipQuery() {
    return (moment().unix() - this.lastSyncTimestamp) < MIN_UPPER_BOUND_TIME;
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
        this.updateLastSyncTimestamp();
        this.loading = false;
        if (notifications && notifications.length) {
          this.appendNotifications(notifications);
        }
      }).catch(() => {
        this.loading = false;
      });
    }
  };
}