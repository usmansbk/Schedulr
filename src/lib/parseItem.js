import moment from 'moment';
import 'twix';
import { I18n } from 'aws-amplify';
import capitalize, { decapitalize } from './capitalizr';

export const getCategory = (category) => {
  if (!category) return '';
  if (category.toLowerCase().trim() === 'normal') return '';
  return decapitalize(category);
};

export const getTime = ({ startAt, endAt, allDay }) => {
  const t = moment(startAt).twix(endAt, allDay);
  const isSameDay = t.isSame('day');
  return t.format({
    hideDate: true && isSameDay,
    allDay: I18n.get("EVENT_ITEM_allDay"),
    explicitAllDay: true,
    implicitMinutes: false,
    groupMeridiems: false
  });
};

export const getHumanTime = ({ startAt, endAt, allDay }) => {
  const t = moment(startAt).twix(endAt, allDay).format();
  return t;
};

export const isPast = (date) => {
  const d = moment(date).endOf('day');
  return moment().twix(d).isPast();
};

export const isPastExact = date => moment().twix(date).isPast();

export const isStarted = ({ isCancelled, startAt, endAt }) => {
  const t = moment(startAt).twix(endAt);
  return (!isCancelled && t.isCurrent());
};

export const isToday = (event) => {
  const { startAt, endAt, isCancelled } = event;
  const cancelledDates = event.cancelledDates || [];
  return (
    moment(startAt).twix(endAt).isSame('day') ||
    moment(startAt).twix(endAt).isCurrent() ||
    isCancelled || cancelledDates.includes(startAt)
  );
};

export const getDuration = (startAt, endAt, allDay) => {
  if (allDay) return null;
  const t = moment(startAt).twix(endAt);
  return decapitalize(t.humanizeLength());
};

export const isEventCancelled = (event) => {
  const { startAt, isCancelled } = event;
  const cancelledDates = event.cancelledDates || [];
  return isCancelled || cancelledDates.includes(startAt);
}

export const getStatus = ({
  isCancelled,
  cancelledDates = [],
  startAt,
  endAt,
  isConcluded
}) => {
  if (isConcluded) return I18n.get("STATUS_concluded");
  const cancelled =  isEventCancelled({ cancelledDates, startAt, isCancelled });
  if (cancelled) return I18n.get("STATUS_cancelled");
  const isEnded = moment().twix(endAt).isPast();
  if (isEnded) return I18n.get("STATUS_done");
  const isOngoing = moment(startAt).twix(endAt).isCurrent();
  if (isOngoing) return I18n.get('STATUS_ongoing');
  return I18n.get("STATUS_upcoming");
};

export const isEventValid = (event) => {
  const { isCancelled, startAt, endAt } = event;
  const cancelledDates = event.cancelledDates || [];
  return moment().twix(endAt).isCurrent() && !isEventCancelled({ cancelledDates, startAt, isCancelled });
};

export const parseRepeat = (recurrence) => {
  const val = recurrence.toLowerCase();
  switch(val) {
    case 'never': return '';
    case 'daily': return 'daily';
    case 'weekly': return 'weekly';
    case 'weekdays': return 'every weekday';
    case 'monthly': case 'monthly_day': return 'monthly';
    case 'yearly': return 'yearly';
    default: return recurrence;
  }
};

export const captionDetails = ({
  allDay,
  recurrence,
  category,
  duration
}) => {
  const validCategory = category ? ' ' + category : '';
  const caption = allDay ? (`${capitalize(recurrence)}${validCategory}`) : (
    `${duration}${validCategory}${recurrence ? ' ' + recurrence : ''}`);
  return caption.trim();
};