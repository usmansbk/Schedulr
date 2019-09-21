import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import { Alert } from 'react-native';
import { I18n } from 'aws-amplify';
import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import { requestLocationPermission } from 'helpers/permissions';

export default class Location {
  @persist('object') @observable point = null;

  @persist @observable locality = null;
  @persist @observable country = null;
  @persist @observable countryCode = null;

  @persist @observable useLocation = true;
  @persist @observable neverAskToUseLocation = false;

  @action requestLocation = async () => {
    if (!this.point && !this.neverAskToUseLocation) {
      Alert.alert(I18n.get("REQUEST_LOCATION_TITLE"), I18n.get('REQUEST_LOCATION_MESSAGE'), [
        {
          text: I18n.get("BUTTON_ok"),
          onPress: async () => await this.fetchLocation()
        },
        {
          text: I18n.get("BUTTON_cancel")
        },
        {
          text: I18n.get("BUTTON_neverAskAgain"),
          onPress: () => this.neverAskToUseLocation = true
        }
      ]);
    }
  };

  @action fetchLocation = async () => {
    try {
      const hasLocationPermission = await requestLocationPermission();
      if (hasLocationPermission) {
        await Geolocation.getCurrentPosition(
          async (position) => {
            const { coords: {
              latitude,
              longitude
            } } = position;
            const loc = {
              lat: latitude,
              lng: longitude
            };

            this.point = loc;

            try {
              const locations = await Geocoder.geocodePosition(loc);
              // console.log(locations);
              const bestLocation = locations[0];
              const {
                locality,
                country,
                countryCode
              } = bestLocation;
              this.locality = locality;
              this.country = country;
              this.countryCode = countryCode;

            } catch (error) {
              console.log(error);
            }
          },
          (error) => {
            console.log(error.message);
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  @computed get location() {
    if (this.locality && this.country) {
      return `${this.locality}, ${this.countryCode}`;
    }
    return null;
  }
}