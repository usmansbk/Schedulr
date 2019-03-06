import moment from 'moment';
import twix from 'twix';
import { decapitalize } from './capitalizr';
import { ONE_TIME_EVENT } from './constants';

export const parseDetails = (event) => {
  const eventType = decapitalize(event.eventType);
  const isRecurring = event.repeat !== ONE_TIME_EVENT;
  const repeat = decapitalize(event.repeat);
  const note = `${isRecurring ? (repeat + ' ') : ''}${eventType}`;
  return note;
};

export const getTime = ({ startAt, endAt, allDay }) => {
  const t = moment(startAt).twix(endAt, allDay);
  const isSameDay = t.isSame('day');
  return t.format({
    hideDate: true && isSameDay,
    allDay: 'All day',
    explicitAllDay: true,
    implicitMinutes: false,
    groupMeridiems: false
  });
}

export const isStarted = ({ isCancelled, startAt, endAt }) => {
  const t = moment(startAt).twix(endAt);
  return (!isCancelled && t.isCurrent());
};

export const getDuration = (startAt, endAt) => {
  const t = moment(startAt).twix(endAt);
  return decapitalize(t.humanizeLength());
};

export const isEventCancelled = ({ cancelledDates=[], startAt, isCancelled }) => isCancelled || cancelledDates.includes(startAt);

export const getStatus = ({
  isCancelled,
  cancelledDates = [],
  startAt,
  endAt
}) => {
  const cancelled =  isEventCancelled({ cancelledDates, startAt, isCancelled });
  if (cancelled) return 'Cancelled';
  const isEnded = moment().twix(endAt).isPast();
  if (isEnded) return 'Done';
  const isOngoing = moment(startAt).twix(endAt).isCurrent();
  if (isOngoing) return 'Ongoing';
  return 'Upcoming';
}

export const isEventValid = ({isCancelled, startAt, endAt, cancelledDates }) => {
  return moment().twix(endAt).isCurrent() && !isEventCancelled({ cancelledDates, startAt, isCancelled });
};

export const isSingle = (repeat) => repeat === ONE_TIME_EVENT;