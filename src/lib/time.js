import moment from 'moment';
import capitalizr from './capitalizr';

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

const DATE_ONLY = 'ddd DD, MMM YYYY';
const DATE_TIME = "ddd DD, MMM YYYY, hh:mm a";
const DATE_FORMAT = 'MMMM DD, YYYY';
const DAY_FORMAT = 'dddd';

const headingCalendarFormats = {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: DAY_FORMAT,
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd',
  sameElse: DATE_FORMAT
};

const subheadingCalendarFormats = {
  sameDay: DATE_FORMAT,
  nextDay: DATE_FORMAT,
  nextWeek: DATE_FORMAT,
  lastDay: DATE_FORMAT,
  lastWeek: DATE_FORMAT,
  sameElse: DAY_FORMAT
};

export const repeatLength = (repeat) => {
  switch(repeat) {
    case 'DAILY': return ONE_DAY;
    case 'WEEKLY': return ONE_WEEK;
    case 'MONTHLY': return moment().daysInMonth() * ONE_DAY;
    case 'YEARLY': return moment().weeksInYear() * ONE_WEEK;
    default: return 0;
  }
};

export const formatDate = (startAt, endAt, allDay) => {
  const start = Date.parse(startAt);
  const end = Date.parse(endAt);
  
  if (allDay) {
    return `${moment(start).format('dddd, DD MMMM YYYY')}\nAll day`;
  }
  const isSameDay = moment(start).isSame(moment(end), 'day');
  const isSameMonth = moment(start).isSame(moment(end), 'month');
  const isSameYear = moment(start).isSame(moment(end), 'year');
  if (isSameDay && isSameMonth && isSameMonth) {
    return `${moment(start).format('dddd, DD MMMM YYYY')}\n${moment(start).format('hh:mm a')} - ${moment(end).format('hh:mm a')}`
  } else if (isSameMonth && isSameYear) {
    return `${moment(start).format('MMMM YYYY')}\n${moment(start).format('ddd DD, hh:mm a')} - ${moment(end).format('ddd DD, hh:mm a')}`
  }
  return `From ${moment(start).format('ddd, Do MMM YYYY, hh:mm a')}\nTo ${moment(end).format('ddd, Do MMM YYYY, hh:mm a')}`  
}

export const getNextDate = (event) => {
  const { startAt, repeat, allDay} = event;
  const a0 = Date.parse(startAt);
  const b0 = Date.now();
  let date;
  if ((a0 < b0) || (repeat === 'NEVER')) {
    date = a0;
  } else {
    const x = repeatLength(repeat);
    const y = b0 - a0; // time elapsed since event started
    date = b0 + Math.abs(x - y); // add the delta time (x-y) to next event to the reference date (b0)
  }
  return moment(date).format(allDay ? DATE_ONLY : DATE_TIME);
}

export const timeAgo = (date) => {
  const justNow = Math.abs(moment(date).diff(moment(), 'minutes')) < 1;
  if (justNow) return 'now';
  return moment(date).fromNow();
};

export const getSectionHeaderData = (date) => {
  const momentDate = moment(date);
  const heading = momentDate.calendar(null, headingCalendarFormats);
  const subheading = momentDate.calendar(null, subheadingCalendarFormats);
  let timeAgo = '';
  if (Math.abs(momentDate.diff(moment().startOf('d'), 'hours')) > 24) {
    timeAgo = capitalizr(momentDate.fromNow());
  }
  return {
    heading,
    subheading,
    timeAgo
  };
};