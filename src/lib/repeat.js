import moment from 'moment';

const DAY = "day";
const WEEK = "week";
const WEEKDAY = "weekday";
const MONTH = "month";
const YEAR = "year";
const EXACT = "exact";

function momentUnit(unit) {
	switch(unit) {
		case "DAILY": return DAY;
		case "WEEKLY": return WEEK;
		case "WEEKDAYS": return WEEKDAY;
		case "MONTHLY": return MONTH;
		case "YEARLY": return YEAR;
		default: return EXACT;
	}
}

function nextWeek(date, from, isPrevious) {
  let nextDate;
  const day = moment(from).isoWeekday(); // from date
  const weekday = moment(date).isoWeekday();
  if (day > weekday) { // day passed
    const nextDay = isPrevious ? 7 - weekday : 7 + weekday; // previous week or next week
    nextDate = moment(from).isoWeekday(nextDay);
  } else {
    nextDate = moment(from).isoWeekday(weekday)
  }
  return nextDate;
}

function nextWeekday(from, isPrevious) {
  let nextDate;
  const day = moment(from).isoWeekday();
  if (day >= 6) { // weekends
    const nextDay = isPrevious ? 5 : 8; // jump to prev friday or next monday
    nextDate = moment(from).isoWeekday(nextDay); // set to upcoming monday
  } else {
    nextDate = moment(from);
  }
  return nextDate;
}

function nextMonth(date, from, isPrevious) {
  let nextDate;
  const month = moment(from).month();
  const dayOfMonth = moment(date).date();
  const currentDate = moment(from).date();
  if (currentDate > dayOfMonth) { // date passed
    const direction = isPrevious ? 0 : 1;
    nextDate = moment(from).month(month + direction).date(dayOfMonth); // set to upcoming month
  } else { // yet to happen, set to upcoming date in current month
    nextDate = moment(from).date(dayOfMonth);
  }
  return nextDate;
}

function nextYear(date, from, isPrevious) {
  let nextDate;
  const year = moment(date).year();
  const month = moment(date).month();
  const dayOfMonth = moment(date).date();
  const currentMonth = moment(from).month();
  const currentDay = moment(from).date();

  const direction = isPrevious ? 0 : 1;
  if (currentMonth > month) { // month passed
    nextDate = moment(from).year(year + direction).month(month).date(dayOfMonth); // set to upcoming year
  } else if (currentMonth < month) { // month upcoming
    nextDate = moment(from).month(month).date(dayOfMonth);
  } else { // same month
    if (currentDay > dayOfMonth) { // day passed
      nextDate = moment(from).year(year + direction).month(month).date(dayOfMonth); // set to upcoming year
    } else if (currentDay < dayOfMonth) { // day upcoming
      nextDate = moment(from).month(month).date(dayOfMonth);
    } else { // same day
      nextDate = moment(from);
    }
  }
  return nextDate;
}

function nextDay(from, date) {
  if (moment(from).isBefore(moment(date))) { // date upcoming (yet to happen)
    return moment(date);
  }
  return moment(from);
}

function datesFrom({
  numberOfDates,
  _date,
  _from,
  _every,
  _until,
  _span,
  _maybeFrom,
  previous,
}) {
  const dates = [];
  let nextDate;

  if (_span) { // date span multiple days
    const inRange = moment(_from).isBetween(_date, _span, DAY, "[]");
    if (inRange) {
      const length = Math.round(moment(_span).diff(_date, DAY, true)); // total days span
      const count = Math.round(moment(_from).diff(_date, DAY, true)); // current days span
      for (let i = count, j = 0; i <= length && j < numberOfDates; j++, i++) { // get days span
        nextDate = moment(_date).add(i, DAY);
        dates.push(nextDate);
      }
    };
  }
  
  switch(_every) {
    case DAY:
      nextDate = nextDay(_from, _date);
      break;
    case WEEK: {
      nextDate = nextWeek(_date, _from, previous);
      break;
    };
    case WEEKDAY: {
      nextDate = nextWeekday(_from, previous);
      break;
    };
    case MONTH: {
      nextDate = nextMonth(_date, _from, previous);
      break;
    }
    case YEAR: {
      nextDate = nextYear(_date, _from, previous);
      break;
    };
    default: {
      nextDate = moment(_date);
      break;
    }
  }


  const amount = previous ? -1 : 1;
  for (let i = dates.length; i <= numberOfDates; i++) {
    // edge cases
    if (previous) {
      if (nextDate.isAfter(_from, DAY)) break;
      if (nextDate.isBefore(_date, DAY)) break;
    } else {
      if (!_maybeFrom && nextDate.isBefore(_from, DAY)) break;
    }
    if (_until) { // expired date
      if (nextDate.isAfter(_until, DAY)) break; 
    }
    dates.push(nextDate);
    if (_every === EXACT) break;
    nextDate = moment(nextDate).add(amount, _every);
  }
  return dates;
}

export default function repeat(date) {
  let _date = moment(date).startOf(DAY);
  let _every = null;
  let _until = null;
  let _span = null;
  let _from = moment(date).startOf(DAY);
  let _maybeFrom = false;

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
    // prevent FlatList from making non-recurring past events as upcoming
    maybeFrom(date) {
      this.from(date);
      _maybeFrom = true;
      return this;
    },
    until(date) {
      if (date) {
        _until = moment(date);
      }
      return this;
    },
    next(numberOfDates) {
      return datesFrom({
        numberOfDates,
        _date,
        _every,
        _from,
        _until,
        _span,
        _maybeFrom
      });
    },
    previous(numberOfDates) {
      return datesFrom({
        numberOfDates,
        _date,
        _every,
        _from,
        _until,
        _span,
        previous: true
      });
    },
    nextDate() {
      return this.next(1)[0];
    },
    previousDate() {
      return this.previous(1)[0];
    },
    matches(date) {
      if (_from && moment(date).isBefore(_from, DAY)) return false;
      if (moment(date).isBefore(_date, DAY)) return false;
      if (_until) {
        if (moment(date).isAfter(_until, DAY)) return false;
      }
      return match(_date, _every, date, _span, _from);
    },
    span(date) {
      if (date) {
        _span = moment(date);
      }
      return this;
    },
    moment() {
      return moment(_date);
    },
    nextSpan() {
      return nextSpan(_date, _span, _from, _every);
    }
  };

  return rule;
}

function nextSpan(_date, _span, _from, _every) {
  switch(_every) {
    case EXACT: return nextExactSpan(_date, _span, _from);
    case DAY: case WEEKDAY: return nextDaySpan(_date, _span, _from);
    case WEEK: return nextWeekSpan(_date, _span, _from);
    case MONTH: return nextMonthSpan(_date, _span, _from);
    case YEAR: return nextYearSpan(_date, _span, _from);
    default: return _span; 
  }
}

function nextYearSpan(_date, _span, _from) {
  let nextDate;
  const day = moment(_date).dayOfYear();
  const endDay = moment(_span).dayOfYear();
  console.log(day, endDay);
  const length = Math.abs(endDay - day);
  const temp = moment(_span);
  if (!length) {
    nextDate = moment(_from);
    nextDate.hour(temp.hour()).minute(temp.minute()).second(temp.second());
    console.log(nextDate)
  } else if (length > 1) {
    nextDate = moment(_from).endOf(DAY);
  } else {
    nextDate = moment(_from).dayOfYear(temp.dayOfYear());
    nextDate.hour(temp.hour()).minute(temp.minute()).second(temp.second());
  }

  return nextDate;
}

function nextDaySpan(_date, _span, _from) {
  const length = Math.round(moment(_span).diff(moment(_date), "hour", true));

  const previousEndMoment = moment(_span);
	const hr = previousEndMoment.hour();
	const min = previousEndMoment.minute();
  const sec = previousEndMoment.second();
  const nextDate = moment(_from).add(length, "hour").hour(hr).minutes(min).seconds(sec);

  return nextDate;
}

function nextExactSpan(_date, _span, _from) {
  let nextDate;
  const length = Math.round(moment(_span).diff(moment(_date), DAY, true));
  const count = Math.round(moment(_from).diff(moment(_date), DAY, true));
  if (count && count < length - 1) {
    nextDate = moment(_from).endOf(DAY);
  } else {
    nextDate = _span;
  }
  return nextDate;
}

function nextWeekSpan(_date, _span, _from) {

  let nextDate;
  const length = Math.round(moment(_span).diff(moment(_date), DAY, true));
  const numberOfDaysFromDate = Math.round(moment(_from).diff(moment(_date), DAY, true)) + 1; // inclusive
  const daysLeft = numberOfDaysFromDate % 7;
  if (daysLeft && daysLeft < length) {
    nextDate = nextYear(_span, _from);
  } else {
    nextDate = _span;
  }
  return nextDate;
}

function nextMonthSpan(_date, _span, _from) {
  let nextDate;
  const startDate = moment(_date).date();
  const endDate = moment(_span).date();
  const currentDate = moment(_from).date();
  const length = Math.round(moment(_span).diff(moment(_date), DAY, true));
  const left = Math.abs(endDate - currentDate);

  if (currentDate > startDate && left < length) {
    nextDate = moment(_from).endOf(DAY);
  } else {
    nextDate = _span;
  }

  return nextDate;
}

function match(_date, _every, date, _span, _from) {
  if (_span && moment(date).isBetween(_date, _span, null, "[]")) return true; // first date is ongoing

  switch(_every) {
    case DAY: return true;
    case WEEKDAY: return matchWeekday(date, _date, _span);
    case WEEK: return matchWeek(date, _date, _span, _from);
    case MONTH: return matchMonth(date, _date, _span);
    case YEAR: return matchYear(date, _date, _span);
    default: return matchExact(date, _date, _span);
  }
}

function matchExact(date, _date) {
  return moment(date).isSame(_date, DAY);
}

function matchYear(date, _date) {
  return ((moment(date).date() === _date.date()) &&
    (moment(date).month() === _date.month()));
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
      const numberOfDaysFromDate = Math.round(moment(date).diff(moment(_date), DAY, true));
      const daysLeft = numberOfDaysFromDate % 7; // days left for current week to end
      // Invariant: Event can't repeat until current one has ended
      // Hence: days left should be less than length of the span
      if (daysLeft < spanDays) return true;
    } 
  }

  const day = moment(_date).isoWeekday();
  const targetDay = moment(date).isoWeekday();
  return (targetDay === day);
}