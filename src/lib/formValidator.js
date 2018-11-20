import { Alert } from 'react-native';
import { repeatLength } from './time';
import { CANT_REPEAT, INVALID_START } from './errorMessages';

export const canRepeat = (event) => {
  if (event.repeat === 'NEVER') return true;
  const duration = Math.abs(event.end - event.start);
  return duration < repeatLength(event.repeat);
};
export function isEventValid(event) {
  let validity = true
  if (!canRepeat(event)) {
    Alert.alert("Repeat", CANT_REPEAT);
    validity = false;
  } else if (event.start > event.end) {
    Alert.alert('Duration', INVALID_START);
    validity = false;
  }
  return validity;
}