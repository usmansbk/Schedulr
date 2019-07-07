import moment from 'moment';
import 'twix';
import { decapitalize } from './capitalizr';
import { ONE_TIME_EVENT } from './constants';

export const parseDetails = (event) => {
  const eventType = decapitalize(event.eventType);
  const isRecurring = event.repeat !== ONE_TIME_EVENT;
  const repeat = decapitalize(event.repeat);
  const note = `${isRecurring ? (repeat + ' ') : ''}${eventType}`;
  return note;
};

export const getEventType = (eventType) => {
  if (eventType.toLowerCase().trim() === 'normal') return null;
  return decapitalize(eventType);
}

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
};

export const getHumanTime = ({ startAt, endAt, allDay }) => {
  const t = moment(startAt).twix(endAt, allDay).format();
  return t;
}

export const isPast = (date) => {
  const d = moment(date).endOf('day');
  return moment().twix(d).isPast();
}

export const isPastExact = date => moment().twix(date).isPast();

export const isStarted = ({ isCancelled, startAt, endAt }) => {
  const t = moment(startAt).twix(endAt);
  return (!isCancelled && t.isCurrent());
};

export const isToday = ({ startAt, endAt, isCancelled, cancelledDates }) => {
  return (
    moment(startAt).twix(endAt).isSame('day') ||
    moment(startAt).twix(endAt).isCurrent() ||
    isCancelled || cancelledDates.includes(startAt)
  );
}

export const getDuration = (startAt, endAt, allDay) => {
  if (allDay) return null;
  const t = moment(startAt).twix(endAt);
  return decapitalize(t.humanizeLength());
};

export const isEventCancelled = ({ cancelledDates=[], startAt, isCancelled }) => isCancelled || cancelledDates.includes(startAt);

export const getStatus = ({
  isCancelled,
  cancelledDates = [],
  startAt,
  endAt,
  isConcluded
}) => {
  if (isConcluded) return 'Concluded';
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

export const parseRepeat = (repeat) => {
  const val = repeat.toLowerCase();
  switch(val) {
    case 'never': return null;
    case 'daily': return 'daily';
    case 'weekly': return 'weekly';
    case 'weekdays': return 'every weekday';
    case 'monthly': case 'monthly_day': return 'monthly';
    case 'yearly': return 'yearly';
    default: return repeat;
  }
}

export const isSingle = (repeat) => repeat === ONE_TIME_EVENT;