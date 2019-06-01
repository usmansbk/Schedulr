import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import debounce from 'lodash.debounce';

export default class UIState {
  @observable isConnected = false;
  @observable searchText = '';
  @observable query = '';
  @persist('list') @observable mutedList = [];

  debounceQuery = debounce((val) => this.query = val, 250);
  
  @action toggleConnection = (isConnected) => {
    this.isConnected = isConnected;
  }

  @action toggleMute = (id) => {
    const hasId = this.mutedList.includes(id);
    if (hasId) {
      this.mutedList = this.mutedList.filter(currentId => id === currentId);
      console.log('unmuted', id);
    } else {
      this.mutedList = [...this.mutedList.slice(0), id];
      console.log('muted', id);
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