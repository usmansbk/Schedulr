import Geolocation from 'react-native-geolocation-service';
import {Geocoder} from 'react-native-geodb';
import {observable, action, computed} from 'mobx';
import {persist} from 'mobx-persist';
import {I18n} from 'aws-amplify';
import {requestLocationPermission} from 'helpers/permissions';
import numeral from 'numeral';
import logger from 'config/logger';
import snackbar from '../helpers/snackbar';
import env from 'config/env';

export default class Location {
  @persist('object') @observable point = null;
  @persist('object') @observable currentLocation = null;

  @persist @observable locality = null;
  @persist @observable country = null;

  @action setCurrentLocation = (loc) => (this.currentLocation = loc);

  @action fetchLocation = async (callback, requestTagLocation) => {
    try {
      const hasLocationPermission = await requestLocationPermission(
        requestTagLocation,
      );
      if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            const {
              coords: {latitude, longitude},
            } = position;
            const geo_point = {
              lat: latitude,
              lon: longitude,
            };

            this.point = geo_point;
            const loc = {
              lat: latitude,
              lng: longitude,
            };
            this.currentLocation = loc;
            Geocoder(loc, env.GEODB_API_KEY)
              .then((locations) => {
                const bestLocation = locations[0];
                const {city, country} = bestLocation;
                this.locality = city;
                this.country = country;
                callback && callback(this.location);
              })
              .catch((error) => {
                snackbar(I18n.get('ERROR_failedToGetLocation'), true);
                logger.logError(error);
              });
          },
          (error) => {
            snackbar(error.message, true);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } catch (error) {
      logger.logError(error);
    }
  };

  @action setSearchLocation({city, country}) {
    this.locality = city;
    this.country = country;
  }

  @computed get adLocation() {
    if (this.point && this.point.lat && this.point.lon) {
      return [this.point.lat, this.point.lon];
    }
    return undefined;
  }

  @computed get location() {
    if (this.locality && this.country) {
      return `${this.locality}, ${this.country}`;
    }
    return 'Kaduna, Nigeria';
  }

  @computed get searchLocation() {
    if (this.locality && this.country) {
      return `${this.locality}, ${this.country}`;
    }
    return 'Kaduna, Nigeria';
  }

  @computed get parsedLocation() {
    if (this.point) {
      const lat = this.point.lat;
      const lon = this.point.lon;
      return `${this.sign(lat)}${numeral(Math.abs(lat)).format(
        '00.0000',
      )}${this.sign(lon)}${numeral(Math.abs(lon)).format('000.0000')}`;
    }
    return null;
  }

  // %2B is the url code for the plus sign
  sign(number) {
    if (number > 0) return `%2B`;
    return '-';
  }

  @action reset() {
    this.country = null;
    this.point = null;
    this.locality = null;
    this.currentLocation = null;
  }
}
