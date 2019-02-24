import { observable } from 'mobx';

export default class RemindMe {
  @observable fiveMin = true;
  @observable tenMin = false;
  @observable fifteenMin = false;
  @observable thirtyMin = false;
  @observable oneHour = false;
  @observable oneDay = false;
  
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}