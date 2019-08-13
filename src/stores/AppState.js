import { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import SimpleToast from 'react-native-simple-toast';
import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import { I18n } from 'aws-amplify';
import debounce from 'lodash.debounce';
import memoize from 'memoize-one';
import { requestLocationPermission } from 'helpers/permissions';
import categories from 'i18n/categories';
import client from 'config/client';
import { getBookmarks } from 'api/fragments';

export default class AppState {
  constructor(settingsStore) {
    this.settings = settingsStore;
  }
  @persist @observable userId = null;
  @persist @observable loggingIn = false;

  @observable isConnected = false;
  @observable searchText = '';
  @observable query = '';
  @persist @observable address = 'Nigeria';
  @persist('list') @observable mutedEvents = [];
  @persist('list') @observable mutedSchedules = [];
  @persist('list') @observable allowedEvents = [];
  @persist('object') @observable location = {
    lon: null,
    lat: null
  };
  @persist('object') @observable prefs = {
    showPrivateScheduleAlert: true,
  };

  @persist('list') @observable categories =  categories(this.settings.language);

  debounceQuery = debounce((val) => this.query = val, 250);

  @action setUserId = id => this.userId = id;

  @action setLoginState = (state) => this.loggingIn = Boolean(state);
  
  @action toggleConnection = (isConnected) => {
    this.isConnected = isConnected;
  };

  @action togglePref = (pref) => {
    const prevValue = this.prefs[pref];
    this.prefs[pref] = !prevValue;
  };

  @action reset() {
    this.isConnected =false;
    this.searchText = '';
    this.query = '';
    this.mutedEvents = [];
    this.allowedEvents = [];
    this.mutedSchedules = [];
    this.address = 'Nigeria';
    this.location = {
      lat: null,
      lon: null
    };
    this.prefs = {
      showPrivateScheduleAlert: true,
    }
    this.categories = categories(this.settingsStore.language);
    this.loggingIn = false;
    this.userId = null;
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
  
  @action setLocation = (address) => {
    this.address = address;
    if (address) {
      Geocoder.geocodeAddress(address)
        .then(res => {
          const loc = res[0];
          const { lat, lng } = loc;
          this.location.lon = lng;
          this.location.lat = lat;
        }).catch(err => console.error(err));
    }
  };

  @action getAddress = () => {
    if (this.location.lon && this.location.lat) {
      const loc =  {
        lat: this.location.lat,
        lng: this.location.lon
      };
      Geocoder.geocodePosition(loc).then(res => {
        const loc = res[0];
        const address = `${loc.locality ? loc.locality + ', ' : ''}${loc.country}`;
        this.address = address;
      }).catch(err => console.error(err));
    }
  };
  
  @action requestLocation = async () => {
    const { lon, lat } = this.location;
    if (!(lon && lat)){
      Alert.alert(
        I18n.get("ALERT_permissionLocationTitle"),
        I18n.get("ALERT_permissionLocationMessage"),
        [
          { text: I18n.get("BUTTON_askMeLater") },
          { text: I18n.get("BUTTON_yes"), onPress: this.getLocation },
        ],
        { cancelable: false }
      );
    }
  };

  @action getLocation = async () => {
    const requestGranted = await requestLocationPermission();
    if (requestGranted) {
      Geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: {
              longitude,
              latitude
            }
          } = position;
          this.location.lon = longitude;
          this.location.lat = latitude;
          this.getAddress();
        },
        (error) => {
          console.error(error);
          SimpleToast.show(I18n.get("TOAST_locationError"), SimpleToast.SHORT);
          // throw error;
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000
        }
      );
    }
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

  @action clearMutedList = () => {
    this.mutedEvents = [];
  };

  @action onChangeText (searchText) {
    this.searchText = searchText;
    this.debounceQuery(searchText);
  }

  getBookmarkIds = memoize((data) => data.bookmarks.items.map(
      item => item.event.id
    ));

  isBookmarked(id) {
    const data = client.readFragment({
      fragment: getBookmarks,
      id: `User:${this.userId}`
    });
    const ids = this.getBookmarkIds(data);
    return ids.includes(id);
  }
}