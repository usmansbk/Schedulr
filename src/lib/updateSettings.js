import OneSignal from 'react-native-onesignal';
import client from '../config/apolloClient';
import schdlAll from './remindr';
import EVENTS from '../graphql/localState/query/AllEvents';

export const updatePushSettings = (key, val=true) => {
  switch(key) {
    case 'sound': return OneSignal.enableSound(val);
    case 'vibrate': return OneSignal.enableVibrate(val);
    case 'push': return OneSignal.setSubscription(val);
    default:
      OneSignal.enableSound(true);
      OneSignal.enableVibrate(true);
      OneSignal.setSubscription(true);
      break;
  }
}

export function updateReminders() {
  const data = client.readQuery({ query: EVENTS });
  const { events } = data;
  if (events) {
    const { edges } = events;
    if (edges) {
      schdlAll(edges);
    }
  }
}