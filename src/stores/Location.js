import Geolocation from 'react-native-geolocation-service';
import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import { I18n } from 'aws-amplify';
import { requestLocationPermission } from 'helpers/permissions';
import Geocoder from 'helpers/geocoder';
import SimpleToast from 'react-native-simple-toast';

export default class Location {
  @persist('object') @observable point = {};
  @persist('object') @observable currentLocation = {};

  @persist @observable locality = null;
  @persist @observable country = null;
  @persist @observable countryCode = null;
  @persist @observable searchLocation = null;

  @action fetchLocation = async () => {
    if (this.searchLocation) return;
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
            Geocoder(loc).then((locations) => {
              const bestLocation = locations[0];
              const {
                city,
                country,
                countryCode
              } = bestLocation;
              this.locality = city;
              this.country = country;
              if (!this.searchLocation) this.searchLocation = city;
              this.countryCode = countryCode;
            }).catch((error) => {
              console.log(error);
              SimpleToast.show(I18n.get("ERROR_failedToGetLocation"), SimpleToast.SHORT);
            });
          },
          (error) => {
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
    this.point = {};
    this.locality = null;
    this.countryCode = null;
    this.currentLocation = {};
    this.searchLocation = null;
  }
}