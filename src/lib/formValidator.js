import { Alert } from 'react-native';
import moment from 'moment';
import { I18n } from 'aws-amplify';
import { repeatLength, FIVE_MINUTES } from 'lib/time';
import { ONE_TIME_EVENT } from 'lib/constants';

export const canRepeat = ({ recurrence, endAt, startAt }) => {
  if (recurrence === ONE_TIME_EVENT ) return true; // One-time event can be repeated
  const duration = moment(endAt).diff(moment(startAt));
  return duration < repeatLength(recurrence);
};
export function isEventValid(event) {
  const startAt = moment(event.startAt);
  const endAt = moment(event.endAt);
  const untilAt = event.until && moment(event.until);

  let validity = true
  if (!canRepeat(event)) {
    Alert.alert(I18n.get("ALERT_repeat"), I18n.get("ALERT_cantRepeat"));
    validity = false;
  } else if (startAt.isAfter(endAt)) {
    Alert.alert(I18n.get("ALERT_duration"), I18n.get("ALERT_invalidStart"));
    validity = false;
  } else if (endAt.diff(startAt) < FIVE_MINUTES) {
    Alert.alert(I18n.get("ALERT_tooShort"), I18n.get("ALERT_durationTooShort"));
    validity = false;
  } else if (untilAt) {
    const rLength = repeatLength(event.recurrence);
    const tail = moment.duration(rLength);
    const secondTime = endAt.clone().add(tail, 'valueOf');
    if (secondTime.isAfter(untilAt)) {
      Alert.alert(I18n.get("ALERT_until"), I18n.get("ALERT_shortUntil"));
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