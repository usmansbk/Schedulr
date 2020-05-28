import moment from 'moment';

function momentUnit(unit) {
	switch(unit) {
		case "DAILY": return "day";
		case "WEEKLY": return "week";
		case "WEEKDAY": return "weekday";
		case "MONTHLY": return "month";
		case "YEARLY": return "year";
		default: return "exact";
	}
}

export default function repeat(date) {
  _date = moment(date);
  _every = null;
  _until = null;
  _from = moment(date).startOf('day');

  const rule = {
    every(recurrence) {
      _every = momentUnit(recurrence);
      return this;
    },
    from(date) {
      _from = moment(date).startOf('day');
      return this;
    },
    until(date) {
      if (date) {
        _until = moment(date);
      }
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
      if (moment(date).isBefore(_from, 'day')) return false;
      if (_until) {
        if (moment(date).isAfter(_until, 'day')) return false;
      }
      switch(_every) {
        case "day": return true;
        case "weekday": return moment(date).isoWeekday() < 6;
        case "week": return moment(date).isoWeekday() === _date.isoWeekday();
        case "month": return moment(date).date() === _date.date();
        case "year": return ((moment(date).date() === _date.date()) &&
          (moment(date).month() === _date.month()));
        default: return moment(date).isSame(_date, "day");
      }
    },
    moment() {
      return moment(_date);
    }
  };

  return rule;
}

repeat.DAY = 'day';
repeat.WEEK = 'week';
repeat.WEEKDAY = 'week';
repeat.MONTH = 'month';
repeat.YEAR = 'year';