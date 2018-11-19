import { Alert } from 'react-native';
import { repeatLength } from './time';

export const canRepeat = (event) => {
  if (event.repeat === 'ONCE') return true;
  const duration = Math.abs(event.end - event.start);
  return duration < repeatLength(event.repeat);
};
export function isEventValid(event) {
  let validity = true
  if (!canRepeat(event)) {
    Alert.alert("Repeat", "Event's duration should be shorter than repeat frequency.");
    validity = false;
  } else if (event.start > event.end) {
    Alert.alert('Duration', 'End date should be greater than start date.');
    validity = false;
  }
  return validity;
}