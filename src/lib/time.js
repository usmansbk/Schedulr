import moment from 'moment';
import 'moment-twitter';
import 'twix';
import numeral from 'numeral';
import capitalizr, { decapitalize } from './capitalizr';

export const SECOND = 1000;
export const ONE_MINUTE = 60 * SECOND;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = 24 * ONE_HOUR;
export const ONE_WEEK = 7 * ONE_DAY;

export const FIVE_MINUTES = 5 * ONE_MINUTE;
export const TEN_MINUTES = 2 * FIVE_MINUTES;
export const FIFTEEN_MINUTES = 3 * FIVE_MINUTES;
export const THIRTY_MINUTES = 3 * TEN_MINUTES;
export const FORTY_FIVE_MINUTES = 3 * FIFTEEN_MINUTES;

const DATE_FORMAT = 'MMMM DD, YYYY';
const DAY_FORMAT = 'dddd';
const NEXT_LAST_FORMAT = 'dddd, Do';

const DAYS_IN_WEEK = 7;
const TIME_FORMAT = 'hh:mm:ss';
  
const dayStart = moment('07:00:00', TIME_FORMAT);
const dayEnd = moment('19:00:00', TIME_FORMAT);

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

export const repeatLength = (repeat) => {
  switch(repeat) {
    case 'DAILY': return ONE_DAY;
    case 'WEEKDAYS': return ONE_DAY;
    case 'WEEKLY': return ONE_WEEK;
    case 'MONTHLY': case 'MONTHLY_DAY': return moment().daysInMonth() * ONE_DAY;
    case 'YEARLY': return moment().weeksInYear() * ONE_WEEK;
    default: return 0;
  }
};

export const formatDate = (startAt, endAt, allDay) => {
  return moment(startAt).twix(endAt, allDay).format({
    explicitAllDay: true,
    allDay: 'All day',
    implicitMinutes: false,
    groupMeridiems: false
  }); 
}

const getIteration = (repeat) => {
  switch(repeat) {
    case 'DAILY': return 'days';
    case 'WEEKDAYS': return 'weekdays';
    case 'WEEKLY': return 'weeks';
    case 'MONTHLY': return 'months';
    case 'YEARLY': return 'years';
    default: return 'hours';
  }
}

export const getNextDate = (event) => {
  const { startAt, endAt, repeat } = event;
  // const iter = moment(startAt).twix(endAt).iterate(getIteration(repeat));
  // if (iter.hasNext()) return iter.next().format();
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

function getMonthlyDay(date) {
  const d = moment(date);
  const currentDate = d.date();
  const week = Math.ceil(currentDate / DAYS_IN_WEEK);
  let order;
  if (week === 1) order = "first";
  else if (week === 2) order = "second";
  else if (week === 3) order = "third";
  else if (week === 4) order = "last";
  else order = numeral(week).format('0o');

  const dayInWeek = d.format('dddd');

  return `Monthly (every ${order} ${dayInWeek})`;
}

export function getRepeatLabel(id, date) {
  const val = id.toLowerCase();
  switch(val) {
    case 'never': return 'One-time event';
    case 'weekly': return `Weekly (every ${moment(date).format('dddd')})`;
    case 'weekdays': return 'Weekdays (Mon - Fri)';
    case 'monthly_day': return getMonthlyDay(date);
    case 'monthly': return `Monthly (${moment(date).format('Do')} of every month)`;
    case 'yearly': return `Yearly (every ${moment(date).format('Do MMMM')})`;
    default: return decapitalize(id);
  }
}

export function isDayTime() {
  return moment().isBetween(dayStart, dayEnd);
}