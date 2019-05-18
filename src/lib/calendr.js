import moment from 'moment';
import 'moment-recur';
import 'twix';
import memoize from 'memoize-one';
import { sortBy } from 'lib/sectionizr';

const DAYS_IN_WEEK = 7;
export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
];

function getRepeat(recur) {
  switch (recur) {
    case 'DAILY': return 'days';
    case 'WEEKDAYS': return 'weekdays';
    case 'WEEKLY':  return 'weeks';
    case 'MONTHLY': return 'months';
    case 'MONTHLY_DAY': return 'month_day';
    case 'YEARLY': return 'years';
    default: return null;
  }
}

function getNextEvents(initialEvents=[], afterDays, daysPerPage) {
  const sections = [];
  if (initialEvents.length) {
    for (let i = afterDays; i < afterDays + daysPerPage; i++) {
      const nextDate = moment().add(i, 'day').toISOString();
      sections.push(getNextDayEvents(initialEvents, nextDate));
    }
  }
  return sections;
}

function getPreviousEvents(initialEvents=[], beforeDays, daysPerPage) {
  const sections = [];
  if (initialEvents.length) {
    for (let i = beforeDays; i < beforeDays + daysPerPage; i++) {
      const nextDate = moment().add(-(i), 'day').toISOString();
      sections.push(getNextDayEvents(initialEvents, nextDate));
    }
  }
  return sections.reverse();
}

/**
  * @param { Array } initialEvents - an array of calendar events
  * @param { Date } afterDate - date to start from
  * @return 
  */
function getNextDayEvents(initialEvents, nextDate) {
  let refDate = moment();
  if (nextDate) refDate = moment(nextDate);

  return initialEvents.reduce((accumulator, currentEvent) => {
    const eventDate = moment(currentEvent.startAt);
    const repeat = getRepeat(currentEvent.repeat);
    const isExtended = eventDate.twix(currentEvent.endAt).contains(refDate.toISOString());
    const isValid = currentEvent.until ? refDate.isSameOrBefore(moment(currentEvent.until), 'day') : true;

    if (repeat && !currentEvent.isCancelled && isValid) {
      let recurrence;
      if (repeat === 'weekdays') {
        recurrence = eventDate.recur().every(weekdays).daysOfWeek();
      } else if (repeat === 'month_day') {
        const currentDate = eventDate.date();
        const weekOfMonth = Math.ceil(currentDate / DAYS_IN_WEEK) - 1;
        const daysOfWeek = eventDate.format('dddd');

        recurrence = eventDate.recur().every(daysOfWeek).daysOfWeek()
          .every(weekOfMonth).weeksOfMonthByDay();
      } else {
        recurrence = eventDate.recur().every(1, repeat);
      }
      const hasNext = recurrence.matches(refDate);
      if (hasNext) {
        const start = moment(currentEvent.startAt);
        const startSec = start.seconds();
        const startMins = start.minutes();
        const startHours = start.hours();

        const end = moment(currentEvent.endAt);

        const duration = Math.abs(moment.duration(start.diff(end)));

        const startAt = refDate.seconds(startSec).minutes(startMins).hours(startHours).toISOString();

        const endAt = moment(startAt).add(duration).toISOString();

        accumulator.data.push(Object.assign({}, currentEvent, {
          startAt,
          endAt
        }));
      }
    } else if (!repeat && eventDate.isSame(refDate, 'day') || isExtended) {
      accumulator.data.push(currentEvent);
    }
    accumulator.data = sortBy(accumulator.data, 'startAt');
    return accumulator;
  }, {
    data: [],
    title: refDate.startOf('day').toISOString()
  });
}

const getEvents = (events) => {
  return events.map((currentEvent) => {
    const eventDate = moment(currentEvent.startAt);
    const repeat = getRepeat(currentEvent.repeat);
    let recurrence;
    if (repeat) {
      if (repeat === 'weekdays') {
        recurrence = eventDate.recur().every(weekdays).daysOfWeek();
      } else {
        recurrence = eventDate.recur().every(1, repeat);
      }
      if (Date.now() > Date.parse(currentEvent.startAt)) {
        recurrence.fromDate(moment().toISOString());
      }
      const start = eventDate;
      const end = moment(currentEvent.endAt);
      
      const startSec = start.seconds();
      const startMins = start.minutes();
      const startHours = start.hours();

      const duration = Math.abs(moment.duration(start.diff(end)));

      const nextDates = recurrence.next(1);

      const startAt = nextDates[0].local().seconds(startSec).minutes(startMins).hours(startHours).toISOString();
      const endAt = moment(startAt).local().add(duration).toISOString();
      return  Object.assign({}, currentEvent, {
        startAt,
        endAt,
      });
    }
    return currentEvent;
  });
};

function hasPreviousEvents(events, { beforeNumOfDays, beforeDate }) {
  const refDate = beforeNumOfDays ? moment().add(-(beforeNumOfDays), 'days') :
    moment(beforeDate);
  return events.some((event) => {
    const eventDate = moment(event.startAt);
    return eventDate.isSameOrBefore(refDate);
  });
}

function hasMoreEvents(events, { afterNumOfDays, afterDate }) {
  const refDate = afterNumOfDays ? moment().add(afterNumOfDays, 'days') :
    moment(afterDate);
  return events.some((event) => {
    const eventDate = moment(event.startAt);
    const isRepeating = getRepeat(event.repeat);
    const isValid = event.until ? moment(event.until).isSameOrAfter(refDate) : true;
    return eventDate.isSameOrAfter(refDate) || (isRepeating && isValid);
  });
}

export {
  getEvents,
  getNextEvents,
  getPreviousEvents,
  hasPreviousEvents,
  hasMoreEvents
}