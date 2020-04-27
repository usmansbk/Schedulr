import moment from 'moment';
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
    validity = false;
  } else if (startAt.isAfter(endAt)) {
    validity = false;
  } else if (endAt.diff(startAt) < FIVE_MINUTES) {
    validity = false;
  } else if (untilAt) {
    const length = repeatLength(event.recurrence);
    const duration = moment.duration(length);
    const secondTime = endAt.clone().add(duration, 'ms');
    if (secondTime.isAfter(untilAt)) {
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

export function buildForm(data) {
  let temp = Object.assign({}, data);
  Object.keys(temp).forEach(key => {
    const value = temp[key];
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) {
        temp[key] = null;
      } else {
        temp[key] = trimmed;
      }
    } else if (value === undefined) {
      temp[key] = null;
    }
  });
  return temp;
}