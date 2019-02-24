import { observable, action } from 'mobx';

export default class RemindMe {
  @observable fiveMin = true;
  @observable tenMin = false;
  @observable fifteenMin = false;
  @observable thirtyMin = false;
  @observable oneHour = false;
  @observable oneDay = false;

  @action toggle(key) {
    this[key] = !this[key];
  }
}