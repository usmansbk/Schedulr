import moment from 'moment';

const DAY = 'day';
const WEEK = 'week';
const MONTH = 'month';
const YEAR = 'year';

export default function repeat(startAt, endAt) {
  const _startAt = moment(startAt);
  const _endAt = moment(endAt);
  let _from = moment();
  let _until;
  let _recurrence;

  const rule = {
    from: function (date) {
      _from = moment(date);
      return rule;
    },
    every: function (recurrence = '') {
      _recurrence = recurrence.toLowerCase();
      return rule;
    },
    until: function (until) {
      if (until) {
        _until = moment(until);
      }
      return rule;
    },
    next: function () {
      return next({
        startAt: _startAt,
        endAt: _endAt,
        recurrence: _recurrence,
        from: _from,
        until: _until,
      });
    },
    previous: function () {
      return next({
        startAt: _startAt,
        endAt: _endAt,
        recurrence: _recurrence,
        from: _from,
        until: _until,
        previous: true,
      });
    },
    matches: function (date) {
      return matches({
        date,
        startAt: _startAt,
        endAt: _endAt,
        recurrence: _recurrence,
        from: _from,
        until: _until,
      });
    },
  };
  return rule;
}

function next(rule) {
  switch (rule.recurrence) {
    case 'daily': {
      return nextDay(rule);
    }
    case 'weekdays': {
      return nextWeekday(rule);
    }
    case 'weekly': {
      return nextWeek(rule);
    }
    case 'monthly': {
      return [];
    }
    case 'yearly': {
      return [];
    }
    default:
      return [rule.startAt, rule.endAt];
  }
}

function getDuration(startAt, endAt) {
  return moment(endAt).diff(startAt, 'milliseconds', true);
}

function setTime(date, target) {
  const t = moment(target);
  const d = moment(date);

  const h = t.hour();
  const m = t.minutes();
  const s = t.seconds();

  return d.hour(h).minute(m).second(s);
}

function nextDay({startAt, endAt, from, previous}) {
  const start = setTime(from, startAt).add(previous ? -1 : 0, DAY);
  const end = setTime(
    start.clone().add(getDuration(startAt, endAt), 'milliseconds'),
    endAt,
  );

  return [start.toISOString(), end.toISOString()];
}

function nextWeek({startAt, endAt, from}) {
  const start = moment(startAt);
  const _from = moment(from);
  const days = Math.round(Math.abs(_from.diff(start, DAY, true)));
  const daysLeft = days % 7;
  let _startAt, _endAt;

  if (!daysLeft) {
    _startAt = _from;
  } else {
    const dayOfWeek = start.isoWeekday();
    _startAt = _from.clone().isoWeekday(dayOfWeek);
  }

  _startAt = setTime(_startAt, startAt);
  _endAt = _startAt.clone().add(getDuration(startAt, endAt), 'millisecond');
  return [_startAt.toISOString(), _endAt.toISOString()];
}

function nextWeekday({startAt, endAt, from, previous}) {
  const day = moment(from).isoWeekday();
  if (day > 5) {
    const monday = moment().isoWeekday(1);
    const end = monday.clone().add(getDuration(startAt, endAt), 'milliseconds');
    return [monday.toISOString(), end.toISOString()];
  } else {
    return nextDay({startAt, endAt, from, previous});
  }
}

function matches(rule) {
  if (!isValid(rule)) {
    return false;
  }
  switch (rule.recurrence) {
    case 'daily': {
      return true;
    }
    case 'weekly': {
      return matchWeek(rule);
    }
    case 'weekdays': {
      return matchWeekdays(rule);
    }
    case 'monthly': {
      return matchMonth(rule);
    }
    case 'yearly': {
      return matchYear(rule);
    }
    default:
      return moment(rule.date).isBetween(rule.startAt, rule.endAt, DAY, []);
  }
}

function isValid({date, from, startAt, until}) {
  const _date = moment(date);
  const _start = moment(startAt);
  const _from = moment(from);
  const matchStart = _date.isSameOrAfter(_start, DAY);
  const matchFrom = _date.isSameOrAfter(_from, DAY);
  const matchUntil = Boolean(until)
    ? _date.isSameOrBefore(moment(until))
    : true;

  return matchFrom && matchStart && matchUntil;
}

function matchWeekdays({date}) {
  const startDayOfWeek = 1;
  const endDayOfWeek = 5;
  const currentDayOfWeek = moment(date).isoWeekday();

  return currentDayOfWeek >= startDayOfWeek && currentDayOfWeek <= endDayOfWeek;
}

function matchYear({date, startAt, endAt}) {
  const start = moment(startAt);
  const end = moment(endAt);
  const _date = moment(date);

  const currentMonth = _date.dayOfYear();
  const startMonth = start.dayOfYear();
  const endMonth = end.dayOfYear();
  const length = Math.abs(startMonth - endMonth);

  return currentMonth >= startMonth && currentMonth <= startMonth + length;
}

function matchMonth({date, startAt, endAt}) {
  const start = moment(startAt);
  const end = moment(endAt);
  const _date = moment(date);

  const currentDate = _date.date();
  const startDate = start.date();
  const length = Math.abs(Math.round(end.diff(start, DAY, true)));

  return currentDate >= startDate && currentDate <= startDate + length;
}

function matchWeek({date, startAt, endAt}) {
  const currentDayOfWeek = moment(date).isoWeekday();
  const startDayOfWeek = moment(startAt).isoWeekday();
  const endDayOfWeek = moment(endAt).isoWeekday();
  const length = Math.abs(endDayOfWeek - startDayOfWeek);

  return (
    currentDayOfWeek >= startDayOfWeek &&
    currentDayOfWeek <= startDayOfWeek + length
  );
}
