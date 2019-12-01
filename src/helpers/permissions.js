import { PermissionsAndroid } from 'react-native';
import { I18n } from 'aws-amplify';
import stores from 'stores';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: I18n.get('REQUEST_LOCATION_TITLE'),
        message: I18n.get('REQUEST_LOCATION_MESSAGE'),
        buttonPositive: I18n.get("OK"),
        buttonNegative: I18n.get("Cancel"),
        buttonNeutral: I18n.get("Ask Me Later")
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    stores.snackbar.show(error.message);
    return false;
  }
}

export {
  requestLocationPermission
};
