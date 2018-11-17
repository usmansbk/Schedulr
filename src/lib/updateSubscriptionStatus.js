import OneSignal from 'react-native-onesignal';
import Config from 'react-native-config';
import { AsyncStorage } from 'react-native';

const SERVER_ENDPOINT = '/api/subscribe';
export const updateServerSubscription = async (status) => {
  const token = await AsyncStorage.getItem('token');
  fetch(`${Config.PROTOCOL}${Config.DOMAIN}${SERVER_ENDPOINT}`, {
    method: 'post',
    headers: {
      "Content-type": "application/json; charset=utf-8",
      "Authorization": token
    },
    body: JSON.stringify(status)
  })
    .then(res => res.json());
}

export default function updateSubscriptionStatus() {
  OneSignal.getPermissionSubscriptionState(updateServerSubscription);
}