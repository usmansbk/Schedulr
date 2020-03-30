import moment from 'moment';
import { I18n } from 'aws-amplify';
import { repeatLength, FIVE_MINUTES } from 'lib/time';
import { ONE_TIME_EVENT } from 'lib/constants';
import snackbar from 'helpers/snackbar';

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
    snackbar(I18n.get("HELPER_TEXT_invalidDatesAndRecur"));
    validity = false;
  } else if (startAt.isAfter(endAt)) {
    snackbar(I18n.get("ALERT_invalidStart"));
    validity = false;
  } else if (endAt.diff(startAt) < FIVE_MINUTES) {
    snackbar(I18n.get("ALERT_durationTooShort"));
    validity = false;
  } else if (untilAt) {
    const length = repeatLength(event.recurrence);
    const duration = moment.duration(length);
    const secondTime = endAt.clone().add(duration, 'ms');
    if (secondTime.isAfter(untilAt)) {
      snackbar(I18n.get("ALERT_shortUntil"));
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