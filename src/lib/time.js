import moment from 'moment';
import 'twix';
import { I18n } from 'aws-amplify';
import { capitalize, decapitalize } from './utils';

export const SECOND = 1000;
export const ONE_MINUTE = moment.duration(1, 'minute').asMilliseconds();
export const ONE_HOUR = moment.duration(1, 'hour').asMilliseconds();
export const ONE_DAY = moment.duration(1, 'day').asMilliseconds();
export const ONE_WEEK = moment.duration(1, 'week').asMilliseconds();

export const FIVE_MINUTES = 5 * ONE_MINUTE;
export const TEN_MINUTES = 2 * FIVE_MINUTES;
export const FIFTEEN_MINUTES = 3 * FIVE_MINUTES;
export const THIRTY_MINUTES = 3 * TEN_MINUTES;
export const FORTY_FIVE_MINUTES = 3 * FIFTEEN_MINUTES;

export const repeatLength = (recurrence) => {
  switch(recurrence) {
    case 'DAILY': return ONE_DAY;
    case 'WEEKDAYS': return ONE_DAY;
    case 'WEEKLY': return ONE_WEEK;
    case 'MONTHLY': return moment().daysInMonth() * ONE_DAY;
    case 'YEARLY': return moment().weeksInYear() * ONE_WEEK;
    default: return 0;
  }
};

export const formatDate = (startAt, endAt, allDay) => {
  return moment(startAt).twix(endAt, allDay).format({
    explicitAllDay: true,
    allDay: I18n.get("EVENT_ITEM_allDay"),
    implicitMinutes: false,
    groupMeridiems: false
  }); 
};

export const calendarTime = (date) => moment(date).calendar(null, I18n.get('calendarTimeFormats'));

export const getNextDate = (event) => {
  const { startAt, endAt } = event;
  return moment(startAt).twix(endAt).format();
};

export const timeAgo = (date) => {
  return moment(date).fromNow(true);
};

export const getSectionHeaderData = (date) => {
  const momentDate = moment(date);
  const heading = capitalize(momentDate.calendar(null, I18n.get('headingCalendarFormats')));
  const subheading = capitalize(momentDate.calendar(null, I18n.get('subheadingCalendarFormats')));
  let timeAgo = '';
  if (Math.abs(momentDate.diff(moment().startOf('D'), 'hours')) > 24) {
    timeAgo = capitalize(momentDate.from(moment().startOf('D')));
  }
  return {
    heading,
    subheading,
    timeAgo
  };
};

export function getRepeatLabel(id, date) {
  const val = id.toLowerCase();
  switch(val) {
    case 'never': return I18n.get(`RECUR_${val}`);
    case 'daily': return I18n.get(`RECUR_daily`);
    case 'weekly': return I18n.get(`RECUR_${val}`)(moment(date).format('dddd'));
    case 'weekdays': return I18n.get(`RECUR_${val}`);
    case 'monthly': return I18n.get(`RECUR_${val}`);
    case 'yearly': return I18n.get(`RECUR_${val}`)(moment(date).format('Do MMMM'));
    default: return decapitalize(id);
  }
}

export const getHumanMonth = (startAt) => {
  return moment(startAt).format('MMM').toUpperCase();
};

export function getTimeUnit(recurrence) {
  const val = recurrence.toLowerCase();
  switch (val) {
    case 'daily': return 'days';
    case 'weekly': case 'weekdays': return 'weeks';
    case 'monthly': return 'months';
    case 'yearly': return 'years';
    default: return 'seconds';
  }
}

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
  if (allDay) return '';
  const t = moment(startAt).twix(endAt);
  return decapitalize(t.humanizeLength());
};

export const momentCounter = ({ startAt, ref_date }) => {
  const currentMoment = moment(ref_date).startOf('D');
  const startMoment = moment(startAt).startOf('D');
  const count = currentMoment.diff(startMoment, 'd');
  return count;
};