import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import debounce from 'lodash.debounce';
import moment from 'moment';
import gql from 'graphql-tag';
import categories from 'i18n/categories';
import { getDeltaUpdates, getUserData } from 'api/queries';
import updateBaseQuery from 'helpers/deltaSync';
import client from 'config/client';

const DeltaQuery = gql(getDeltaUpdates);
const BaseQuery = gql(getUserData);

export default class AppState {
  constructor(settingsStore) {
    this.settings = settingsStore;
  }

  @observable isConnected = false;
  @observable searchText = '';
  @observable query = '';
  @observable discoverFilter = '';
  @observable loading = false;

  @persist @observable userId = null;
  @persist @observable loggingIn = false;
  @persist @observable lastSyncTimestamp = moment().unix();
  
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

  @action toggleFilter = (id) => this.discoverFilter = id.toLowerCase();

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
    if (!this.loading) {
      this.loading = true;
      client.query({
        fetchPolicy: 'network-only',
        query: DeltaQuery,
        variables: {
          lastSync: String(this.lastSyncTimestamp)
        }
      }).then(result => {
        this.loading = false;
        this.updateLastSyncTimestamp();
        const { data: fetchMoreResult } = result;
        if (fetchMoreResult && fetchMoreResult.deltaSync) {
          const prev = client.readQuery({
            query: BaseQuery,
            variables: {
              id: this.userId
            }
          });
          const data = updateBaseQuery({
            prev,
            fetchMoreResult,
          });
          client.writeQuery({
            query: BaseQuery,
            variables: {
              id: this.userId
            },
            data
          });
        }
      }).catch((error) => {
        console.log(error);
        this.loading = false;
      });
    }
  }

  isToggled = (id) => this.discoverFilter === id.toLowerCase();
  debounceQuery = debounce(val => this.query = val, 250);
}