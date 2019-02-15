import { PermissionsAndroid } from 'react-native';
import SimpleToast from 'react-native-simple-toast';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Schdlr Location Permission',
        message: "Schdlr App needs access to your location so events are easier to find.",
        buttonPositive: "OK",
        buttonNegative: "Cancel",
        buttonNeutral: "Ask Me Later"
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (e) {
    SimpleToast.show(e.message, SimpleToast.SHORT);
    return false;
  }
}

export {
  requestLocationPermission
};
