import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import debounce from 'lodash.debounce';

export default class UIState {
  @observable isConnected = false;
  @observable searchText = '';
  @observable query = '';
  @persist('list') @observable mutedList = [];
  @persist('list') @observable allowedList = [];

  debounceQuery = debounce((val) => this.query = val, 250);
  
  @action toggleConnection = (isConnected) => {
    this.isConnected = isConnected;
  }

  @action reset() {
    this.isConnected =false;
    this.searchText = '';
    this.query = '';
    this.mutedList = [];
    this.allowedList = [];
  }

  @action toggleMute = (id, isMuted) => {
    const hasId = this.mutedList.includes(id);
    const isAllowed = this.allowedList.includes(id);
    if (hasId) {
      this.mutedList = this.mutedList.filter(currentId => id !== currentId);
    } else if (isAllowed && isMuted) {
      this.allowedList = this.allowedList.filter(currentId => id !== currentId);
    } else if (isMuted && !isAllowed) {
      this.allowedList.push(id);
    } else {
      this.mutedList.push(id);
    }
  }

  @action clearMutedList = () => {
    this.mutedList = [];
  }

  @action onChangeText (searchText) {
    this.searchText = searchText;
    this.debounceQuery(searchText);
  }
}