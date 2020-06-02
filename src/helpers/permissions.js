import { PermissionsAndroid } from 'react-native';
import { I18n } from 'aws-amplify';
import logger from 'config/logger';
import snackbar from 'helpers/snackbar';

async function requestReadWritePermission() {
  try {
    const response = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ]
    );
    const readGranted = response[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE];
    const writeGranted = response[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE];
    const granted = PermissionsAndroid.RESULTS.GRANTED;

    const hasPermission = (writeGranted === granted) && (readGranted === granted);
    return hasPermission;
  } catch (error) {
    logger.logError(error);
  }
  return false;
}

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: I18n.get('REQUEST_LOCATION_TITLE'),
        message: I18n.get('REQUEST_LOCATION_MESSAGE'),
        buttonPositive: I18n.get("BUTTON_ok"),
        buttonNegative: I18n.get("BUTTON_cancel"),
        buttonNeutral: I18n.get("BUTTON_askMeLater")
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    snackbar(error.message);
    return false;
  }
}

export {
  requestLocationPermission,
  requestReadWritePermission
};
