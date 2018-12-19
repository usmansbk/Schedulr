import { Alert } from 'react-native';
import { repeatLength } from './time';
import { CANT_REPEAT, INVALID_START } from './errorMessages';

export const canRepeat = ({ repeat, endAt, startAt }) => {
  if (repeat === 'NEVER') return true;
  const duration = Math.abs(Date.parse(endAt) - Date.parse(startAt));
  return duration < repeatLength(repeat);
};
export function isEventValid({startAt, endAt, repeat}) {
  let validity = true
  if (!canRepeat({ startAt, endAt, repeat })) {
    Alert.alert("Repeat", CANT_REPEAT);
    validity = false;
  } else if (startAt > endAt) {
    Alert.alert('Duration', INVALID_START);
    validity = false;
  }
  return validity;
}