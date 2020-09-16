import moment from 'moment';

export default function date(date) {
  return moment(date).toISOString();
}

function format(date, format) {
  return moment(date).format(format);
}

function exactTime(date) {
  return moment(date).seconds(0).milliseconds(0).toISOString();
}

function toDate(date) {
  return moment(date).toDate();
}

function toDateString(date) {
  return toDate(date).toDateString();
}

function calendar(date, format) {
  return moment(date).calendar(null, format);
}

export {format, exactTime, toDate, toDateString, calendar, date};
