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

export const repeatLength = (repeat) => {
  switch(repeat) {
    case 'DAILY': return ONE_DAY;
    case 'WEEKLY': return ONE_WEEK;
    case 'MONTHLY': return moment().daysInMonth() * ONE_DAY;
    case 'YEARLY': return moment().weeksInYear() * ONE_WEEK;
    default: return 0;
  }
};

export const formatDate = (start, end, allDay) => {
  const isSameDay = moment(start).isSame(moment(end), 'day');
  const isSameMonth = moment(start).isSame(moment(end), 'month');
  const isSameYear = moment(start).isSame(moment(end), 'year');
  if (allDay) {
    return `${moment(start).format('dddd, DD MMMM YYYY')}\nAll day`;
  } else if (isSameDay && isSameMonth && isSameMonth) {
    return `${moment(start).format('dddd, DD MMMM YYYY')}\n${moment(start).format('hh:mm a')} - ${moment(end).format('hh:mm a')}`
  } else if (isSameMonth && isSameYear) {
    return `${moment(start).format('MMMM YYYY')}\n${moment(start).format('ddd DD, hh:mm a')} - ${moment(end).format('ddd DD, hh:mm a')}`
  }
  return `From ${moment(start).format('ddd, Do MMM YYYY, hh:mm a')}\nTo ${moment(end).format('ddd, Do MMM YYYY, hh:mm a')}`  
}