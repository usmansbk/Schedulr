import PushNotification from 'react-native-push-notification';
import OneSignal from 'react-native-onesignal';

const resetNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
}

export function clearNotifications() {
  PushNotification.cancelAllLocalNotifications();
  OneSignal.clearOneSignalNotifications();
};

export default resetNotifications; 