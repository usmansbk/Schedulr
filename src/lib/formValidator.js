import { Alert } from 'react-native';
import moment from 'moment';
import { repeatLength, FIVE_MINUTES } from 'lib/time';
import { ONE_TIME_EVENT } from 'lib/constants';
import {
  CANT_REPEAT,
  INVALID_START,
  DURATION_TOO_SHORT,
  SHORT_UNTIL
} from 'lib/errorMessages';

export const canRepeat = ({ repeat, endAt, startAt }) => {
  if (repeat === ONE_TIME_EVENT ) return true; // One-time event can be repeated
  const duration = moment(endAt).diff(moment(startAt));
  return duration < repeatLength(repeat);
};
export function isEventValid(event) {
  const startAt = moment(event.startAt);
  const endAt = moment(event.endAt);
  const untilAt = event.until && moment(event.until);

  let validity = true
  if (!canRepeat(event)) {
    Alert.alert("Repeat", CANT_REPEAT);
    validity = false;
  } else if (startAt.isAfter(endAt)) {
    Alert.alert('Duration', INVALID_START);
    validity = false;
  } else if (endAt.diff(startAt) < FIVE_MINUTES) {
    Alert.alert('Too short', DURATION_TOO_SHORT);
    validity = false;
  } else if (untilAt) {
    const rLength = repeatLength(event.repeat);
    const tail = moment.duration(rLength);
    const secondTime = endAt.clone().add(tail, 'valueOf');
    if (secondTime.isAfter(untilAt)) {
      Alert.alert("Until date", SHORT_UNTIL);
      validity = false;
    }
  }
  return validity;
}

// Trim the value of a form TextInput
export const getValue = (value) => {
  const ret = value && value.trim() && value.length && value;
  return Boolean(ret) ? ret : null;
}