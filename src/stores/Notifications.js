import {observable, action, computed} from 'mobx';
import {persist} from 'mobx-persist';
import gql from 'graphql-tag';
import {I18n} from 'aws-amplify';
import {getNotifications} from 'api/queries';
import client from 'config/client';
import snackbar from '../helpers/snackbar';
import {toUnix} from 'lib/date';

export default class Notifications {
  @persist @observable count = 0;
  @persist @observable lastSyncTimestamp = toUnix();
  @persist @observable hasUpdates = false;
  @observable filter = 'all';
  @observable loading = false;

  @persist('list') @observable allNotifications = [];

  @action updateLastSyncTimestamp = (timestamp) => {
    if (timestamp) this.lastSyncTimestamp = timestamp;
    else this.lastSyncTimestamp = toUnix() + 2;
  };

  @action appendNotifications = (newNotifications) => {
    if (newNotifications.length) {
      this.count += newNotifications.length;
      this.allNotifications = this.allNotifications.concat(
        newNotifications.map((notif) => Object.assign(notif, {seen: false})),
      );
    }
  };

  @action markSeen = () => {
    this.allNotifications.forEach((notif) => (notif.seen = true));
    // this.allNotifications = this.allNotifications.map(notif => {
    //   if (!notif.seen) notif.seen = true;
    //   return notif;
    // });
  };

  @action clearNotifications = () => {
    this.allNotifications = [];
    this.filter = 'all';
    this.resetCounter(0);
  };
  @action resetCounter = (temp = 0) => (this.count = temp);

  @action increment = () => (this.count += 1);

  @action decrement = () => (this.count -= 1);

  @action reset() {
    this.clearNotifications();
    this.lastSyncTimestamp = toUnix();
  }

  @computed get updates() {
    if (this.filter === 'all') {
      return this.allNotifications.sort((a, b) => b.timestamp - a.timestamp);
    }
    return this.allNotifications
      .filter((notif) => notif.type === this.filter)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  @action handleFilterAction = (filter) => {
    switch (filter) {
      case 'clear':
        this.clearNotifications();
        break;
      default:
        this.filter = filter;
    }
  };

  @action fetchNotifications = () => {
    if (!this.loading) {
      this.loading = true;
      client
        .query({
          fetchPolicy: 'network-only',
          query: gql(getNotifications),
          variables: {
            lastSync: String(this.lastSyncTimestamp),
          },
        })
        .then((result) => {
          const {data: {notifications} = {}} = result || {};
          const count = notifications && notifications.length;
          if (count) {
            this.appendNotifications(notifications);
            const latest = notifications.sort(
              (a, b) => b.timestamp - a.timestamp,
            )[0];
            this.updateLastSyncTimestamp(latest.timestamp);
            snackbar(I18n.get('TOAST_newNotifications')(this.count));
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  };
}
