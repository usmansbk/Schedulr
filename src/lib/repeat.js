import moment from 'moment';

export default function repeat(date) {
  _date = date;
  _every = null;
  _until = null;
  _from = moment().startOf('day');

  const rule = {
    every(date) {
      _every = moment(date);
      return this;
    },
    from(date) {
      _from = moment(date);
      return this;
    },
    until(date) {
      _until = moment(date);
      return this;
    },
    next(numberOfDates, from) {
      return [moment()];
    },
    previous(numberOfDates, before) {
      return [moment()];
    },
    nextDate() {
      return this.next(1, moment().startOf('day'))[0];
    },
    previousDate() {
      return this.previous(1, moment().startOf('day'))[0];
    },
    matches(date) {
      return false;
    },
    moment() {
      return moment(_date);
    }
  };

  return rule;
}

repeat.DAY = 'DAY';
repeat.WEEK = 'WEEK';
repeat.WEEKDAY = 'WEEKDAY';
repeat.MONTH = 'MONTH';
repeat.YEAR = 'YEAR';