import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

export default class RemindMe {
  @persist @observable fiveMin = true;
  @persist @observable tenMin = false;
  @persist @observable fifteenMin = false;
  @persist @observable thirtyMin = false;
  @persist @observable oneHour = false;
  @persist @observable oneDay = false;
  @observable extraData = 0;

  @action toggle(key) {
    this[key] = !this[key];
    this.extraData += 1;
  }

  @action reset() {
    this.fiveMin = true;
    this.tenMin = false;
    this.fifteenMin = false;
    this.thirtyMin = false;
    this.thirtyMin = false;
    this.oneHour = false;
    this.oneDay = false;
  }
}