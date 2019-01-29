import moment from 'moment';
import twix from 'twix';
import { decapitalize } from './capitalizr';
import { ONE_TIME_EVENT } from './constants';

const START_TIME = 'hh:mm a';

export const parseDetails = (event) => {
  const eventType = decapitalize(event.eventType);
  const isRecurring = event.repeat !== ONE_TIME_EVENT;
  const repeat = decapitalize(event.repeat);
  const note = `${isRecurring ? (repeat + ' ') : ''}${eventType}`;
  return note;
};

export const getTime = ({ startAt, endAt, allDay }) => {
  const t = moment(startAt).twix(endAt, {
    allDay,
    hideDate: true
  });
  return t.format();
}

export const startTime = ({ allDay, startAt }) => {
  return  allDay ? 'All-day' : moment(startAt).format(START_TIME).toUpperCase()
};

export const endTime = ({ endAt, startAt }) => {
  const isSameDay = moment(startAt).isSame(moment(endAt), 'day');
  return (isSameDay) ? moment(startAt).format(START_TIME).toUpperCase() : '';
};

export const isStarted = ({ isCancelled, startAt, endAt }) => {
  return (!isCancelled && (Date.now() > Date.parse(startAt)) && (Date.now() < Date.parse(endAt)));
};

export const getDuration = (startAt, endAt) => {
  const t = moment(startAt).twix(endAt);
  return decapitalize(t.humanizeLength()) + ' ';
}

export const isEventCancelled = ({ cancelledDates=[], startAt, isCancelled }) => isCancelled || cancelledDates.includes(startAt);

export const getStatus = ({
  isCancelled,
  cancelledDates = [],
  startAt,
  endAt
}) => {
  const cancelled =  isEventCancelled({ cancelledDates, startAt, isCancelled });
  if (cancelled) return 'Cancelled';
  const ended = Date.now() > Date.parse(endAt);
  if (ended) return 'Done';
  const ongoing = Date.now() > Date.parse(startAt) && !ended;
  if (ongoing) return 'Ongoing';
  return 'Pending';
}

export const isEventValid = ({isCancelled, startAt, endAt, cancelledDates }) => {
  return (Date.now() < Date.parse(endAt)) && !isEventCancelled({ cancelledDates, startAt, isCancelled });
};

export const isSingle = (repeat) => repeat === ONE_TIME_EVENT;