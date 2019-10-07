import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import moment from 'moment';
import gql from 'graphql-tag';
import client from 'config/client';
import { updatePushToken } from 'api/mutations';

export default class Notifications {
  @persist @observable token = null;
  @persist @observable newCommentsCount = 0;
  @persist @observable lastSyncTimestamp = moment().unix();
  @persist @observable hasNotifications = false;

  @persist('list') @observable notifications = [];

  @action updateLastSyncTimestamp = () => this.lastSyncTimestamp = moment().unix();
  @action appendNotifications = newNotifications => {
    if (newNotifications.length) {
      this.newCommentsCount += newNotifications.filter(notif => notif.type === 'Comment').length;
      this.setNotificationIndicator(true);
      this.notifications = this.notifications.concat(newNotifications);
    }
  };
  @action clearNotifications = () => this.notifications = [];

  @action reset() {
    this.clearNotifications();
    this.lastSyncTimestamp = moment().unix();
    this.token = null;
  }

  @action setNotificationIndicator = status => this.hasNotifications = status;
  @action clearCommentsCounter = () => this.newCommentsCount = 0;

  @computed get updates() {
    return this.notifications.filter(notif => notif.type !== 'Comment').sort((a, b) => -(a.timestamp - b.timestamp));
  }

  @computed get comments() {
    return this.notifications.filter(notif => notif.type === 'Comment').sort((a, b) => -(a.timestamp - b.timestamp));
  }

  @action updatePushToken = ({ os, token }, id) => {
    const key = `${os}Token`;
    if (token !== this.token) {
      client.mutate({
        mutation: gql(updatePushToken),
        variables: {
          input: {
            id,
            [key]: token
          }
        }
      }).catch(console.log);
    }
    this.token = token;
  }

  @action setToken = (token) => {
    if (token) this.token = token;
  };
}