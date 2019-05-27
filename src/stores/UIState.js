import { observable, action } from 'mobx';
import debounce from 'lodash.debounce';

export default class UIState {
  @observable isConnected = false;
  @observable searchText = '';
  @observable query = '';

  debounceQuery = debounce((val) => this.query = val, 250);
  
  @action toggleConnection (isConnected) {
    this.isConnected = isConnected;
  }

  @action onChangeText (searchText) {
    this.searchText = searchText;
    this.debounceQuery(searchText);
  }
}