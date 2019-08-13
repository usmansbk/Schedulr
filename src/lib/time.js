import moment from 'moment';
import 'twix';
import twitter from 'moment-twitter';
import { I18n } from 'aws-amplify';
import capitalizr, { decapitalize } from './capitalizr';

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

const DATE_FORMAT = 'MMMM DD, YYYY';
const DAY_FORMAT = 'dddd';
const NEXT_LAST_FORMAT = 'dddd, Do';

const headingCalendarFormats = {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: DAY_FORMAT,
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd',
  sameElse: DATE_FORMAT
};

const subheadingCalendarFormats = {
  sameDay: NEXT_LAST_FORMAT,
  nextDay: NEXT_LAST_FORMAT,
  nextWeek: DATE_FORMAT,
  lastDay: NEXT_LAST_FORMAT,
  lastWeek: DATE_FORMAT,
  sameElse: DAY_FORMAT
};

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
}

export const getNextDate = (event) => {
  const { startAt, endAt } = event;
  return moment(startAt).twix(endAt).format();
}

export const timeAgo = (date) => {
  return twitter(date).twitterShort();
};

export const getSectionHeaderData = (date) => {
  const momentDate = moment(date);
  const heading = momentDate.calendar(null, headingCalendarFormats);
  const subheading = momentDate.calendar(null, subheadingCalendarFormats);
  let timeAgo = '';
  if (Math.abs(momentDate.diff(moment().startOf('D'), 'hours')) > 24) {
    timeAgo = capitalizr(momentDate.from(moment().startOf('D')));
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
    case 'weekly': return I18n.get(`RECUR_${val}`)(moment(date).format('dddd'));
    case 'weekdays': return I18n.get(`RECUR_${val}`);
    case 'monthly': return I18n.get(`RECUR_${val}`);
    case 'yearly': return I18n.get(`RECUR_${val}`)(moment(date).format('Do MMMM'));
    default: return decapitalize(id);
  }
}

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