import { Storage } from 'aws-amplify';
import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import debounce from 'lodash.debounce';
import moment from 'moment';
import gql from 'graphql-tag';
import { I18n } from 'aws-amplify';
import { ALL_FILTER } from 'lib/constants';
import { getDeltaUpdates, getUserData } from 'api/queries';
import updateBaseQuery from 'helpers/deltaSync';
import client from 'config/client';
import logger from 'config/logger';

const DeltaQuery = gql(getDeltaUpdates);
const BaseQuery = gql(getUserData);

export default class AppState {
  constructor(settingsStore) {
    this.settings = settingsStore;
  }

  @observable isConnected = false;
  @observable searchText = '';
  @observable query = '';
  @observable discoverFilter = ALL_FILTER;
  @observable loading = false;

  @persist @observable userId = null;
  @persist @observable loggingIn = false;
  @persist @observable lastSyncTimestamp = moment().unix();
  
  @persist('list') @observable keysToRemove = [];
  @persist('list') @observable mutedEvents = [];
  @persist('list') @observable mutedSchedules = [];
  @persist('list') @observable allowedEvents = [];
  @persist('list') @observable checkedList = [];
  @persist('object') @observable prefs = {
    showPrivateScheduleAlert: true,
    showAppIntro: true
  };
  @persist('list') @observable categories =  [];

  @action setUserId = id => this.userId = id;
  @action updateLastSyncTimestamp = () => this.lastSyncTimestamp = moment().unix();
  @action setLoginState = state => this.loggingIn = Boolean(state);
  @action toggleConnection = isConnected => this.isConnected = isConnected;
  @action togglePref = (pref) => {
    const prevValue = this.prefs[pref];
    this.prefs[pref] = !prevValue;
  };
  @action clearMutedList = () => this.mutedEvents = [];

  @action toggleFilter = (id) => {
    this.discoverFilter = id.toLowerCase();
  };

  @action checkItem = id => {
    const isChecked = this.checkedList.includes(id);
    if (isChecked) {
      this.checkedList = this.checkedList.filter(currentId => currentId !== id);
    } else {
      this.checkedList.push(id);
    }
  };

  @action setDefaults = () => {
    this.categories = I18n.get('categories');
  }

  isChecked(id) {
    return this.checkedList.includes(id);
  }

  @action reset() {
    this.isConnected =false;
    this.searchText = '';
    this.query = '';
    this.mutedEvents = [];
    this.allowedEvents = [];
    this.mutedSchedules = [];
    this.checkedList = [];
    this.prefs = {
      showPrivateScheduleAlert: true,
      showAppIntro: false
    };
    this.categories = Array.from(I18n.get('categories'));
    this.loggingIn = false;
    this.userId = null;
    this.lastSyncTimestamp = moment().unix();
    this.removeKeysFromStorage();
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

  @action deltaSync() {
    if (!this.loading && this.isConnected) {
      this.loading = true;
      client.query({
        fetchPolicy: 'network-only',
        query: DeltaQuery,
        variables: {
          lastSync: String(this.lastSyncTimestamp)
        }
      }).then(result => {
        this.updateLastSyncTimestamp();
        const { data: fetchMoreResult } = result;
        if (fetchMoreResult && fetchMoreResult.deltaSync) {
          const prev = client.readQuery({
            query: BaseQuery,
          });
          const data = updateBaseQuery({
            prev,
            fetchMoreResult,
          });
          client.writeQuery({
            query: BaseQuery,
            data
          });
        }
        this.loading = false;
      }).catch((error) => {
        logger.logError(error);
        this.loading = false;
      });
    }
  }

  @action removeKeysFromStorage(keys=[]) {
    const queue = this.keysToRemove.concat(keys);
    const removed = [];
    queue.forEach(key => {
      Storage.remove(key).then(() => {
        removed.push(key);
      }).catch((error) => {
        logger.log(error.message);
      });
    });
    const filtered = queue.filter(key => removed.includes(key));
    this.keysToRemove = filtered;
  }

  isToggled = (id) => this.discoverFilter === id.toLowerCase();
  debounceQuery = debounce(val => this.query = val, 250);
}