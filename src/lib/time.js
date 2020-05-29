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

export const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];

export const tick = (start, end) => {
  const startAt = moment(start);
  const endAt = moment(end);
  return moment().isBetween(startAt, endAt, "[]") ? moment().minutes() : 0;
};

export const canRecur = ({ startAt, endAt })  => {
  const recurrence = [
    'NEVER',
  ];
  const duration = moment(endAt).diff(moment(startAt));
  const ONE_MONTH = moment.duration(1, 'month').asMilliseconds();
  const ONE_YEAR = moment.duration(1, 'year').asMilliseconds();
  if (duration <= ONE_DAY) recurrence.push("DAILY")
  if (duration <= ONE_WEEK) recurrence.push("WEEKLY", "WEEKDAYS");
  if (duration <= ONE_MONTH) recurrence.push("MONTHLY");
  if (duration <= ONE_YEAR) recurrence.push("YEARLY");

  return recurrence;
};

export const repeatLength = (recurrence) => {
  switch(recurrence) {
    case 'DAILY': return ONE_DAY;
    case 'WEEKLY': case 'WEEKDAYS': return ONE_WEEK;
    case 'MONTHLY': return moment().daysInMonth() * ONE_DAY;
    case 'YEARLY': return moment().weeksInYear() * ONE_WEEK;
    default: return 0;
  }
};

export const formatDate = (startAt, endAt, allDay) => {
  return moment(startAt).twix(endAt, allDay).format({
    // explicitAllDay: true,
    allDay: I18n.get("EVENT_ITEM_allDay"),
    implicitMinutes: false,
    groupMeridiems: false,
    showDayOfWeek: true,
    weekdayFormat: 'dddd',
    // hideDate: isToday && !isExtended
  }); 
};

export const calendarTime = (date) => moment(date).calendar(null, I18n.get('calendarTimeFormats'));

export const isSpanDays = (from, to) => {
  return !moment(from).isSame(moment(to), 'day');
};

export const isPastDate = (date, endOfDay) => {
  const d = endOfDay ? moment(date).endOf('day') : date;
  moment().twix(d).isPast();
};

export const isWeekDay = (momentDate) => {
  return momentDate.isoWeekday() < 6;
};

export function getTimeUnit(recurrence) {
  const val = recurrence.toLowerCase();
  switch (val) {
    case 'daily': return 'day';
    case 'weekly': case 'weekday': return 'week';
    case 'monthly': return 'month';
    case 'yearly': return 'year';
    default: return 'second';
  }
}

export const getTime = ({ startAt, endAt, allDay, isExtended }) => {
  const t = moment(startAt).twix(endAt, allDay);
  const isSameDay = t.isSame('day');
  return t.format({
    hideTime: isExtended,
    hideDate: isSameDay,
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

export const getDuration = (startAt, endAt) => {
  const start = moment(startAt);
  const end = moment(endAt);
  const isSameDay = start.isSame(end, 'day');
  const allDay = isSameDay && moment(endAt).diff(moment(startAt), 'hour') > 20;

  const t = moment(startAt).twix(endAt, {
    allDay: allDay ? I18n.get("EVENT_ITEM_allDay") : null,
  });
  return decapitalize(t.humanizeLength());
};

export function getDaysCount(from, to) {
  const start = moment(from).startOf('day');
  const end = moment(to).endOf('day');
  return end.diff(start, 'days');
};

// Get next seven days starting from today 
export const getWeekFromNow = (previous) => {
  let dates = [];
  const direction = previous ? -1 : 1;
  let start = previous ? 1 : 0;
  for (let i = start; i < 7; i++) {
    const date = moment().add(i * direction, 'day').startOf('day').toISOString();
    dates.push(date);
  }
  return dates;
};

/**
 * @return { moment[] } - [Mon-Fri]
 */
export const getWeekdays = () => {
  const today = moment().isoWeekday();
  const lastday = today + 7;

  const dates = [];
  for (let i = today; i < lastday; i++) {
    if ((i % 6 !== 0) && (i % 7 !== 0)) { // Exclude Weekends
      dates.push(moment().isoWeekday(i));
    }
  }
  return dates;
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