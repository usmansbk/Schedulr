import { Alert } from 'react-native';
import { repeatLength } from './time';
import { CANT_REPEAT, INVALID_START } from './errorMessages';

export const canRepeat = ({ repeat, end, start }) => {
  if (repeat === 'NEVER') return true;
  const duration = Math.abs(Date.parse(end) - Date.parse(start));
  return duration < repeatLength(repeat);
};
export function isEventValid({start, end, repeat}) {
  let validity = true
  if (!canRepeat({ start, end, repeat })) {
    Alert.alert("Repeat", CANT_REPEAT);
    validity = false;
  } else if (start > end) {
    Alert.alert('Duration', INVALID_START);
    validity = false;
  }
  return validity;
}