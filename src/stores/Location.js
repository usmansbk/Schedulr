import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import { requestLocationPermission } from 'helpers/permissions';
import { GEOCODING_ANDROID_KEY } from 'config/env';
import SimpleToast from 'react-native-simple-toast';
import { I18n } from 'aws-amplify';

Geocoder.fallbackToGoogle(GEOCODING_ANDROID_KEY);

export default class Location {
  @persist('object') @observable point = null;

  @persist @observable locality = null;
  @persist @observable country = null;
  @persist @observable countryCode = null;
  @persist @observable searchLocation = null;
  @persist @observable currentLocation = null;

  @action fetchLocation = async (update) => {
    try {
      const hasLocationPermission = await requestLocationPermission();
      if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { coords: {
              latitude,
              longitude
            } } = position;
            const geo_point = {
              lat: latitude,
              lon: longitude
            };

            this.point = geo_point;
            const loc = {
              lat: latitude,
              lng: longitude
            };
            this.currentLocation = loc;
            Geocoder.geocodePosition(loc).then((locations) => {
              const bestLocation = locations[0];
              const {
                locality,
                country,
                countryCode
              } = bestLocation;
              this.locality = locality;
              this.country = country;
              this.searchLocation = locality;
              this.countryCode = countryCode;
            }).catch((error) => {
              console.log(error);
              SimpleToast.show(I18n.get("ERROR_failedToGetLocation"), SimpleToast.SHORT);
            });
          },
          (error) => {
            console.log(error.message);
            SimpleToast.show(error.message, SimpleToast.SHORT);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  @action setSearchLocation(newLocation) {
    if (newLocation) {
      this.searchLocation = newLocation;
    }
  }

  @computed get location() {
    if (this.locality && this.country) {
      return `${this.locality}, ${this.country}`;
    }
    return null;
  }

  @action reset() {
    this.country = null;
    this.point = null;
    this.locality = null;
    this.countryCode = null;
    this.currentLocation = null;
    this.searchLocation = null;
  }
}