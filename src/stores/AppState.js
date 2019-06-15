import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import SimpleToast from 'react-native-simple-toast';
import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import debounce from 'lodash.debounce';
import { requestLocationPermission } from 'helpers/permissions';
import logger from 'config/logger';

export default class AppState {
  @observable isConnected = false;
  @observable searchText = '';
  @observable query = '';
  @persist @observable address = 'Nigeria';
  @persist('list') @observable mutedList = [];
  @persist('list') @observable allowedList = [];
  @persist('object') @observable location = {
    longitude: null,
    latitude: null
  }
  @persist('list') @observable eventTypes =  [
    'Normal',
    'Lecture',
    'Examination',
    'Test',
    'Task',
    'Meetup',
    'Hobby',
    'Studies',
    'Work',
    'Sport',
    'Meeting',
    'Festival',
    'Ceremony',
    'Competition',
    'Party',
    'Holiday',
  ];

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
    this.address = 'Nigeria';
    this.location = {
      latitude: null,
      longitude: null
    }
  }
  
  @action setLocation = (address) => {
    this.address = address;
    this.location = {
      latitude: null,
      longitude: null,
    };
    if (address) {
      Geocoder.geocodeAddress(address)
        .then(res => {
          const loc = res[0];
          const { lat, lng } = loc;
          this.location.longitude = lng;
          this.location.latitude = lat;
        }).catch(err => logger.error(err));
    }
  }

  @action getAddress = () => {
    if (this.location.longitude && this.location.latitude) {
      const loc =  {
        lat: this.location.latitude,
        lng: this.location.longitude
      };
      Geocoder.geocodePosition(loc).then(res => {
        const loc = res[0];
        const address = `${loc.locality}, ${loc.country}`;
        this.address = address;
      }).catch(err => logger.error(err));
    }
  }

  @action getLocation = () => {
    const { longitude, latitude } = this.location;
    if ((longitude === null) || (latitude === null)) {
      if (requestLocationPermission()) {
        Geolocation.getCurrentPosition(
          (position) => {
            const {
              coords: {
                longitude,
                latitude
              }
            } = position;
            this.location.longitude = longitude;
            this.location.latitude = latitude;
            this.getAddress();
          },
          (error) => {
            logger.debug(error);
            SimpleToast.show("Failed to use location", SimpleToast.SHORT);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000
          }
        )
      }
    }
  };

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