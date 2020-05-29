import moment from 'moment';

function momentUnit(unit) {
	switch(unit) {
		case "DAILY": return "day";
		case "WEEKLY": return "week";
		case "WEEKDAYS": return "weekday";
		case "MONTHLY": return "month";
		case "YEARLY": return "year";
		default: return "exact";
	}
}

function nextWeek(date, from, isPrevious) {
  let nextDate;
  const day = moment(from).isoWeekday();
  const weekday = moment(date).isoWeekday();
  if (weekday < day) { // day passed
    const nextDay = isPrevious ? 7 - weekday : 7 + weekday;
    nextDate = moment(from).isoWeekday(nextDay); // set to upcoming week
  } else {
    nextDate = moment(from).isoWeekday(weekday)
  }
  return nextDate;
}

function nextWeekday(from, isPrevious) {
  let nextDate;
  const day = moment(from).isoWeekday();
  if (day >= 6) { // weekends
    const nextDay = isPrevious ? 5 : 8;
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
  } else {
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

  if (currentMonth > month) { // month passed
    const direction = isPrevious ? 0 : 1;
    nextDate = moment(from).year(year + direction).month(month).date(dayOfMonth); // set to upcoming year
  } else {
    nextDate = moment(from).month(month).date(dayOfMonth);
  }
  return nextDate;
}

function nextDay(date, length, from) {
  if (length) { //
    console.log("Length of", date, "is", length)
    // return moment(from);
  }
  return moment(date);
}

function datesFrom({numberOfDates, date, from, every, until, isPrevious, span}) {
  const dates = [];
  let length = 0;
  if (span) {
    length = moment(span).diff(date, 'days');
  }
  
  switch(every) {
    case "day":
      nextDate = moment(from);
      break;
    case "week": {
      nextDate = nextWeek(date, from, isPrevious);
      break;
    };
    case "weekday": {
      nextDate = nextWeekday(from, isPrevious);
      break;
    };
    case "month": {
      nextDate = nextMonth(date, from, isPrevious);
      break;
    }
    case "year": {
      nextDate = nextYear(date, from, isPrevious);
      break;
    };
    default: {
      nextDate = nextDay(date, length, from);
      break;
    }
  }

  const amount = isPrevious ? -1 : 1;
  for (let i = 0; i <= numberOfDates; i++) {
    if (isPrevious) {
      if (nextDate.isAfter(from, 'day')) break;
    } else {
      if (nextDate.isBefore(from, 'day')) break;
    }
    if (until) {
      if (nextDate.isAfter(until, 'day')) break; 
    }
    dates.push(nextDate);
    nextDate = moment(nextDate).add(amount, every);
  }
  return dates;
}

export default function repeat(date) {
  let _date = moment(date).startOf('day');
  let _every = null;
  let _until = null;
  let _span = null;
  let _from = moment(date).startOf('day');

  const rule = {
    every(recurrence) {
      _every = momentUnit(recurrence);
      return this;
    },
    from(date) {
      if (date) {
        _from = moment(date).startOf('day');
      }
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
        date: _date,
        every: _every,
        from: _from,
        span: _span,
        until: _until,
      });
    },
    previous(numberOfDates) {
      return datesFrom({
        numberOfDates,
        date: _date,
        every: _every,
        from: _from,
        until: _until,
        span: _span,
        isPrevious: true
      });
    },
    nextDate() {
      return this.next(1)[0];
    },
    previousDate() {
      return this.previous(1)[0];
    },
    matches(date) {
      // edge cases
      // if (moment(date).isBefore(_from, 'day')) return false;
      if (moment(date).isBefore(_date, 'day')) return false;
      if (_until) {
        if (moment(date).isAfter(_until, 'day')) return false;
      }
      return match(_date, _every, date, _span);
    },
    span(date) {
      if (date) {
        _span = moment(date);
      }
      return this;
    },
    moment() {
      return moment(_date);
    }
  };

  return rule;
}

function match(target, every, date, span) {
  switch(every) {
    case "day": return true;
    case "weekday": return moment(date).isoWeekday() < 6;
    case "week": return moment(date).isoWeekday() === target.isoWeekday();
    case "month": return moment(date).date() === target.date();
    case "year": return ((moment(date).date() === target.date()) &&
      (moment(date).month() === target.month()));
    default: {
      return moment(date).isBetween(target, span, "day", "[]");
    };
  }
}

repeat.DAY = 'day';
repeat.WEEK = 'week';
repeat.WEEKDAY = 'week';
repeat.MONTH = 'month';
repeat.YEAR = 'year';