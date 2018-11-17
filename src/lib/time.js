import moment from 'moment';

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

const getReccurence = (repeat) => {
  switch(repeat) {
    case 'DAILY': return 'days';
    case 'WEEKLY': return 'weeks';
    case 'MONTHLY': return 'month';
    case 'YEARLY': return 'years';
    default: return 'days';
  }
}

export const repeatLength = (repeat) => {
  switch(repeat) {
    case 'DAILY': return ONE_DAY;
    case 'WEEKLY': return ONE_WEEK;
    case 'MONTHLY': return moment().daysInMonth() * ONE_DAY;
    case 'YEARLY': return moment().weeksInYear() * ONE_WEEK;
    default: return 0;
  }
}

export const getNextDate = (initialDate, repeat, refDate = new Date(), isEnded) => {
  const a0 = Date.parse(initialDate);
  const b0 = Date.parse(refDate);
  if (!isEnded) return a0;
  if ((a0 > b0) || (repeat === 'ONCE')) return a0;
  const x = repeatLength(repeat);
  const y = b0 - a0;
  const a1 = b0 + Math.abs(x - y);
  return a1;
}

export const getStart = (start, repeat, isEdit) => {
  if (isEdit) return moment(start).toISOString();
  if (!start) return moment().toISOString();
  return moment(start).add(1, getReccurence(repeat)).toISOString();
}

export const getEnd = (end, repeat, isEdit) => {
  if (isEdit) return moment(end).toISOString();
  if (!end) return moment().add(2, 'hours').toISOString();
  return moment(end).add(1, getReccurence(repeat)).toISOString();
}

export function getRepeatTime(date, repeat) {
  let newDate = date;
  switch (repeat) {
    case 'MONTHLY':
      newDate = moment(newDate).add(1, 'months');
      break;
    case 'YEARLY':
      newDate = moment(newDate).add(1, 'years');
      break;
    default:
      newDate = moment(newDate).add(15, 'minutes');
      break;
  }
  return Date.parse(newDate.toISOString(true));
}

export default function getRepeatType({ repeat }) {
  switch(repeat) {
    case 'DAILY': return 'day';
    case 'WEEKLY': return 'week';
    default: return 'time';
  }
}