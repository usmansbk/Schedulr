import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import debounce from 'lodash.debounce';
import moment from 'moment';
import categories from 'i18n/categories';

export default class AppState {
  constructor(settingsStore) {
    this.settings = settingsStore;
  }
  
  debounceQuery = debounce(val => this.query = val, 250);


  @observable isConnected = false;
  @observable searchText = '';
  @observable query = '';

  @persist @observable userId = null;
  @persist @observable loggingIn = false;
  @persist @observable lastSyncTimestamp = moment().unix();
  @persist @observable discoverFilter = 'Event';
  
  @persist('list') @observable mutedEvents = [];
  @persist('list') @observable mutedSchedules = [];
  @persist('list') @observable allowedEvents = [];
  @persist('object') @observable prefs = {
    showPrivateScheduleAlert: true,
    showAppIntro: true
  };
  @persist('list') @observable categories =  categories(this.settings.language);

  @action setUserId = id => this.userId = id;
  @action updateLastSyncTimestamp = () => this.lastSyncTimestamp = moment().unix();
  @action setLoginState = state => this.loggingIn = Boolean(state);
  @action toggleConnection = isConnected => this.isConnected = isConnected;
  @action togglePref = (pref) => {
    const prevValue = this.prefs[pref];
    this.prefs[pref] = !prevValue;
  };
  @action clearMutedList = () => this.mutedEvents = [];

  @action toggleFilter = (id) => this.discoverFilter = id;

  @action reset() {
    this.isConnected =false;
    this.searchText = '';
    this.query = '';
    this.mutedEvents = [];
    this.allowedEvents = [];
    this.mutedSchedules = [];
    this.prefs = {
      showPrivateScheduleAlert: true,
      showAppIntro: false
    };
    this.categories = categories(this.settings.language);
    this.loggingIn = false;
    this.userId = null;
    this.lastSyncTimestamp = moment().unix();
    this.discoverFilter = 'Event';
  }

  @action addCustomType = (category) => {
    const hasType = this.categories.findIndex(item => item.toLowerCase() === category.toLowerCase());
    if (hasType === -1) {
      this.categories.push(category);
    }
  };

  @action removeCustomType = (category) => {
    this.categories = this.categories.filter(item => item.toLowerCase() !== category.toLowerCase());
  };

  @action toggleMute = (id, isMuted) => {
    if (isMuted) {
      const inMutedList = this.mutedEvents.includes(id);
      if (inMutedList) {
        this.mutedEvents = this.mutedEvents.filter(currentId => currentId !== id);
      } else {
        this.allowedEvents.push(id);
      }
    } else {
      this.mutedEvents.push(id);
      this.allowedEvents = this.allowedEvents.filter(currentId => currentId !== id);
    }
  };

  @action toggleMuteSchedule = (mutedId, isMuted) => {
    if (isMuted) {
      this.mutedSchedules = this.mutedSchedules.filter(id => id !== mutedId);
    } else {
      this.mutedSchedules.push(mutedId);
    }
  };

  @action onChangeText (searchText) {
    this.searchText = searchText;
    this.debounceQuery(searchText);
  }

  isToggled = (id) => this.discoverFilter === id.toLowerCase();
}