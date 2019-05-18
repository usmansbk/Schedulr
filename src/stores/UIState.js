import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

export default class UIState {
  @observable isConnected = false;
  @observable query = '';
  
  @action toggleConnection (isConnected) {
    this.isConnected = isConnected;
  }

  @action onChangeText (query) {
    this.query = query;
  }
}