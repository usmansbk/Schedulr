import moment from 'moment';
import { decapitalize } from './capitalizr';
import { ONE_TIME_EVENT, REMINDER } from './constants';

const START_TIME = 'hh:mm a';
const DATE_FORMAT = 'DD MM YYYY';

export const parseDetails = (event) => {
  const eventType = decapitalize(event.eventType);
  const isRecurring = event.repeat !== ONE_TIME_EVENT;
  const repeat = decapitalize(event.repeat);
  const note = `${isRecurring ? (repeat + ' ') : ''}${eventType}`;
  return note;
};

export const startTime = ({ allDay, startAt }) => {
  return  allDay ? 'All-day' : moment(Date.parse(startAt)).format(START_TIME).toUpperCase()
};

export const endTime = ({ endAt, startAt }) => {
  const parsedEnd = Date.parse(endAt);
  const parsedStart = Date.parse(startAt);

  const startDay = moment(parsedStart).format(DATE_FORMAT);
  const isSameDay = (startDay === moment(parsedEnd).format(DATE_FORMAT));
  return (isSameDay) ? moment(parsedEnd).format(START_TIME).toUpperCase() : '';
};

export const isStarted = ({ isCancelled, startAt, endAt }) => {
  return (!isCancelled && (Date.now() > Date.parse(startAt)) && (Date.now() < Date.parse(endAt)));
};

export const getDuration = (startAt, endAt, eventType) => {
  if (eventType === REMINDER) return '';
  return decapitalize(moment(startAt).from(endAt, true)) + ' ';
}

export const getStatus = ({
  isCancelled,
  cancelledDates = [],
  startAt,
  endAt
}) => {
  const cancelled =  isCancelled || cancelledDates.includes(startAt);
  if (cancelled) return 'Cancelled';
  const ended = Date.now() > Date.parse(endAt);
  if (ended) return 'Done';
  const ongoing = Date.now() > Date.parse(startAt) && !ended;
  if (ongoing) return 'Ongoing';
  return 'Pending';
}

export const isEventCancelled = ({ cancelledDates=[], startAt, isCancelled }) => isCancelled || cancelledDates.includes(startAt);

export const isEventValid = ({isCancelled, startAt, endAt, cancelledDates }) => {
  return (Date.now() < Date.parse(endAt)) && !isEventCancelled({ cancelledDates, startAt, isCancelled });
};

export const isSingle = (repeat) => repeat === ONE_TIME_EVENT;