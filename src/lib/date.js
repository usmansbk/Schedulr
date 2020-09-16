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
  if (!date) return moment().toDate();
  return moment(date).toDate();
}

function toDateString(date) {
  return toDate(date).toDateString();
}

function toISOString(date) {
  return moment(date).toISOString();
}

function calendar(date, format, isDefault) {
  if (isDefault) {
    return moment(date).calendar();
  }
  return moment(date).calendar(null, format);
}

function add(date, amount, unit) {
  return moment(date).add(amount, unit);
}

function addDuration(date, duration) {
  return moment(date).add(duration);
}

function startOf(date, unitOfTime) {
  return moment(date).startOf(unitOfTime);
}

function endOf(date, unitOfTime) {
  return moment(date).endOf(unitOfTime);
}

function diffDuration(date1, date2) {
  return moment(date1).diff(moment(date2), null, true);
}

function isAfter(date1, date2) {
  return moment(date1).isAfter(moment(date2));
}

function subtractDuration(date, duration) {
  return moment(date).subtract(duration);
}

function castDateTime(source, target) {
  const date = moment(target);
  const src = moment(source);

  const startSec = src.seconds();
  const startMins = src.minutes();
  const startHours = src.hours();

  return date.seconds(startSec).minutes(startMins).hours(startHours).format();
}

function unixTimestamp(timestamp) {
  return moment.unix(timestamp);
}

function toUnix() {
  return moment().unix();
}

function fromNow(date) {
  return moment(date).fromNow();
}

function greaterThan(date1, date2) {
  return moment(date1) > moment(date2);
}

function getDuration(timestamp) {
  return moment.duration(timestamp);
}

function getMonth(date) {
  return moment(date).month();
}

function from(date, start) {
  return moment(date).from(start);
}

function subtract(date, amount, unit) {
  return moment(date).subtract(amount, unit);
}

function now() {
  return moment.now();
}

function valueOf(date) {
  return moment(date).valueOf();
}

function getTime(date) {
  const start = moment(date);
  const hour = start.hour();
  const minute = start.minute();
  const second = start.second();
  return {
    hour,
    minute,
    second,
  };
}

function setTime(d, {hour, minute, second}) {
  const date = moment(d);
  return date.hour(hour).minute(minute).second(second);
}

export {
  format,
  exactTime,
  toDate,
  toDateString,
  calendar,
  date,
  toISOString,
  add,
  startOf,
  endOf,
  addDuration,
  diffDuration,
  isAfter,
  subtractDuration,
  castDateTime,
  unixTimestamp,
  fromNow,
  greaterThan,
  getDuration,
  toUnix,
  getMonth,
  from,
  subtract,
  now,
  valueOf,
  getTime,
  setTime,
};
