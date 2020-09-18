import moment from 'moment';

const DAY = 'day';
const WEEK = 'week';
const WEEKDAY = 'weekday';
const MONTH = 'month';
const YEAR = 'year';
const EXACT = 'exact';

function momentUnit(unit) {
  switch (unit) {
    case 'DAILY':
      return DAY;
    case 'WEEKLY':
      return WEEK;
    case 'WEEKDAYS':
      return WEEKDAY;
    case 'MONTHLY':
      return MONTH;
    case 'YEARLY':
      return YEAR;
    default:
      return EXACT;
  }
}

export default function repeat({startAt, endAt}) {
  let _date = moment(startAt).startOf(DAY);
  let _every = null;
  let _until = null;
  let _span = moment(endAt);
  let _from = moment(startAt).startOf(DAY);

  const rule = {
    every(recurrence) {
      _every = momentUnit(recurrence);
      return this;
    },
    from(date) {
      if (date) {
        _from = moment(date).startOf(DAY);
      }
      return this;
    },
    until(date) {
      if (date) {
        _until = moment(date);
      }
      return this;
    },
    matches(date) {
      if (_from && moment(date).isBefore(_from, DAY)) return false;
      if (moment(date).isBefore(_date, DAY)) return false;
      if (_until) {
        if (moment(date).isAfter(_until, DAY)) return false;
      }
      return match(_date, _every, date, _span, _from);
    },
  };

  return rule;
}

function match(_date, _every, date, _span, _from) {
  if (_span && moment(date).isBetween(_date, _span, null, '[]')) return true; // first date is ongoing

  switch (_every) {
    case DAY:
      return true;
    case WEEKDAY:
      return matchWeekday(date, _date, _span);
    case WEEK:
      return matchWeek(date, _date, _span, _from);
    case MONTH:
      return matchMonth(date, _date, _span);
    case YEAR:
      return matchYear(date, _date, _span);
    default:
      return matchExact(date, _date, _span);
  }
}

function matchExact(date, _date) {
  return moment(date).isSame(_date, DAY);
}

function matchYear(date, _date) {
  return (
    moment(date).date() === _date.date() &&
    moment(date).month() === _date.month()
  );
}

function matchMonth(date, _date) {
  return moment(date).date() === _date.date();
}

function matchWeekday(date, _date) {
  return moment(date).isoWeekday() < 6;
}

function matchWeek(date, _date, _span, _from) {
  if (_span) {
    const spanDays = Math.round(moment(_span).diff(moment(_date), DAY, true));
    if (spanDays) {
      const numberOfDaysFromDate = Math.round(
        moment(date).diff(moment(_date), DAY, true),
      );
      const daysLeft = numberOfDaysFromDate % 7; // days left for current week to end
      // Invariant: Event can't repeat until current one has ended
      // Hence: days left should be less than length of the span
      if (daysLeft < spanDays) return true;
    }
  }

  const day = moment(_date).isoWeekday();
  const targetDay = moment(date).isoWeekday();
  return targetDay === day;
}
