import { observable, action } from 'mobx';

export default class Notifications {
  @observable hasNotifications = false;
  @observable count = 0;

  @action setCount = (count) => {
    if (count >= 0) this.count = count
  };

  @action toggleNotification = () => {
    this.hasNotifications = !this.hasNotifications;
  }

  @action reset = () => {
    this.count = 0;
    this.hasNotifications = false;
  }

}