import {Storage} from 'aws-amplify';
import {observable, action} from 'mobx';
import {persist} from 'mobx-persist';
import debounce from 'lodash.debounce';
import moment from 'moment';
import gql from 'graphql-tag';
import {I18n} from 'aws-amplify';
import {ALL_FILTER} from 'lib/constants';
import {getDeltaUpdates, getUserData} from 'api/queries';
import updateBaseQuery from 'helpers/deltaSync';
import persistState from 'helpers/persistAppState';
import client from 'config/client';
import logger from 'config/logger';

const DeltaQuery = gql(getDeltaUpdates);
const BaseQuery = gql(getUserData);

export default class AppState {
  constructor(settings) {
    this.settings = settings;
  }

  @observable extraData = 0;
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
  @persist('object') @observable prefs = {
    showPrivateScheduleAlert: true,
  };
  @persist('list') @observable categories = [];

  @action updateExtraData = () => (this.extraData += 1);
  @action setUserId = (id) => (this.userId = id);
  @action updateLastSyncTimestamp = () =>
    (this.lastSyncTimestamp = moment().unix());
  @action setLoginState = (state) => (this.loggingIn = Boolean(state));
  @action toggleConnection = (isConnected) => (this.isConnected = isConnected);
  @action togglePref = (pref) => {
    const prevValue = this.prefs[pref];
    this.prefs[pref] = !prevValue;
  };
  @action clearMutedList = () => (this.mutedEvents = []);

  @action toggleFilter = (id) => {
    this.discoverFilter = id.toLowerCase();
  };

  @action setDefaults = () => {
    this.categories = I18n.get('categories');
  };

  @action reset() {
    this.isConnected = false;
    this.searchText = '';
    this.query = '';
    this.mutedEvents = [];
    this.allowedEvents = [];
    this.mutedSchedules = [];
    this.checkedList = [];
    this.prefs = {
      showPrivateScheduleAlert: true,
    };
    this.categories = Array.from(I18n.get('categories'));
    this.loggingIn = false;
    this.userId = null;
    this.lastSyncTimestamp = moment().unix();
    this.removeKeysFromStorage();
  }

  @action addCustomType = (category) => {
    this.categories = Array.from(new Set([...this.categories, category]));
  };

  @action removeCustomType = (category) => {
    this.categories = this.categories.filter(
      (item) => item.toLowerCase() !== category.toLowerCase(),
    );
  };

  @action toggleMute = (id, eventScheduleId) => {
    const isEventMuted = this.mutedEvents.includes(id);
    const isEventAllowed = this.allowedEvents.includes(id);
    const isScheduleMuted = this.mutedSchedules.includes(eventScheduleId);

    if (isEventMuted) {
      this.mutedEvents = this.mutedEvents.filter((cid) => cid !== id);
    } else if (isScheduleMuted) {
      if (isEventAllowed) {
        this.allowedEvents = this.allowedEvents.filter((cid) => cid !== id);
      } else {
        this.allowedEvents = Array.from(new Set([...this.allowedEvents, id]));
      }
    } else {
      this.mutedEvents = Array.from(new Set([...this.mutedEvents, id]));
    }
    this.updateExtraData();
  };

  isEventMuted = (id, scheduleId) => {
    const isEventMuted = this.mutedEvents.includes(id);
    const isScheduleMuted = this.mutedSchedules.includes(scheduleId);
    const isEventAllowed = this.allowedEvents.includes(id);

    const isMuted = isEventMuted || (isScheduleMuted && !isEventAllowed);
    return isMuted;
  };

  @action toggleMuteSchedule = (mutedId, isMuted) => {
    if (isMuted) {
      this.mutedSchedules = this.mutedSchedules.filter((id) => id !== mutedId);
    } else {
      this.mutedSchedules = Array.from(
        new Set([...this.mutedSchedules, mutedId]),
      );
    }
    this.updateExtraData();
  };

  @action onChangeText(searchText) {
    this.searchText = searchText;
    this.debounceQuery(searchText);
  }

  @action deltaSync() {
    if (!this.loading && this.isConnected) {
      this.loading = true;
      client
        .query({
          fetchPolicy: 'network-only',
          query: DeltaQuery,
          variables: {
            lastSync: String(this.lastSyncTimestamp),
          },
        })
        .then((result) => {
          this.updateLastSyncTimestamp();
          const {data: fetchMoreResult} = result;
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
              data,
            });
          }
          this.loading = false;
        })
        .catch((error) => {
          logger.logError(error);
          this.loading = false;
        });
    }
  }

  @action removeKeysFromStorage(keys = []) {
    const queue = Array.from(new Set(this.keysToRemove.concat(keys)));
    const removed = [];
    queue.forEach((key) => {
      Storage.remove(key)
        .then(() => {
          removed.push(key);
        })
        .catch((error) => {
          logger.log(error.message);
        });
    });
    const filtered = queue.filter((key) => removed.includes(key));
    this.keysToRemove = filtered;
    this._persistState();
  }

  @action setState(state = {}) {
    this.allowedEvents = state.allowedEvents || [];
    this.mutedEvents = state.mutedEvents || [];
    this.mutedSchedules = state.mutedSchedules || [];
    this.keysToRemove = state.keysToRemove || [];
  }

  isToggled = (id) => this.discoverFilter === id.toLowerCase();

  _persistState = () => {
    persistState({
      id: this.userId,
      allowedEvents: this.allowedEvents || [],
      mutedEvents: this.mutedEvents || [],
      mutedSchedules: this.mutedSchedules || [],
      keysToRemove: this.keysToRemove || [],
      checkedList: this.checkedList || [],
    });
  };
  debounceQuery = debounce((val) => (this.query = val), 250);
}
