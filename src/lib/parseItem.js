import moment from 'moment';
import capitalizr, { decapitalize } from './capitalizr';

const START_TIME = 'hh:mm a';
const DATE_FORMAT = 'DD MM YYYY';

export const parseDetails = ({ eventType, repeat, endAt, allDay, startAt }) => {
  const recurrence = repeat === 'NEVER' ? '' : decapitalize(repeat);
  const eventType = decapitalize(eventType, true);
  if ((eventType === REMINDER) || allDay) return `${recurrence ? (recurrence + ' ' + eventType) : eventType}`;
  const duration = moment(endAt).from(startAt, true);
  return capitalizr(`${duration} ${eventType.toLowerCase()}, ${recurrence.toLowerCase()}`);
};

export const startTime = ({ allDay, startAt }) => {
  return  allDay ? 'All-day' : moment(startAt).format(START_TIME).toUpperCase()
};

export const endTime = ({ endAt, startAt }) => {
  const startDay = moment(startAt).format(DATE_FORMAT);
  const isSameDay = (startDay === moment(endAt).format(DATE_FORMAT));
  return (isSameDay) ? moment(endAt).format(START_TIME).toUpperCase() : '';
};

export const isStarted = ({ isCancelled, startAt, endAt }) => {
  return (!isCancelled && (Date.now() > startAt) && (Date.now() < endAt));
};
