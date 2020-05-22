import moment from 'moment';

export default function repeat(date) {
  _date = date;
  _every = null;
  _until = null;
  _from = moment().startOf('day');

  const rule = {
    every(recurrence) {
      _every = recurrence;
      return this;
    },
    from(date) {
      _from = moment(date).startOf('day');
      return this;
    },
    until(date) {
      _until = moment(date);
      return this;
    },
    next(numberOfDates) {
      return [moment()];
    },
    previous(numberOfDates) {
      return [moment()];
    },
    nextDate() {
      return this.next(1)[0];
    },
    previousDate() {
      return this.previous(1)[0];
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