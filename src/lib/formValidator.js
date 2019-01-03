import { Alert } from 'react-native';
import { repeatLength } from './time';
import { CANT_REPEAT, INVALID_START, WRONG_TIME } from './errorMessages';

export const canRepeat = ({ repeat, endAt, startAt }) => {
  if (repeat === 'NEVER') return true;
  const duration = Math.abs(endAt - startAt);
  return duration < repeatLength(repeat);
};
export function isEventValid(event) {
  const startAt = Date.parse(event.startAt);
  const endAt = Date.parse(event.endAt);
  const repeat = event.repeat;

  let validity = true
  if (!canRepeat({ startAt, endAt, repeat })) {
    Alert.alert("Repeat", CANT_REPEAT);
    validity = false;
  } else if (startAt > endAt) {
    Alert.alert('Duration', INVALID_START);
    validity = false;
  } else if (endAt < Date.now() ) {
    Alert.alert('Wrong time', WRONG_TIME);
    validity = false;
  }
  return validity;
}