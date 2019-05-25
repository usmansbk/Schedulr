import moment from 'moment';
import 'moment-recur';
import 'twix';
import uniqWith from 'lodash.uniqwith';
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

function getNextEvents(initialEvents=[], afterDate, daysPerPage) {
  const sections = [];
  if (initialEvents.length) {
    for (let i = 1; i <= daysPerPage; i++) {
      const nextDate = moment(afterDate).add(i, 'day');
      sections.push(getNextDayEvents(initialEvents, nextDate));
    }
  }
  return sections;
}

function getPreviousEvents(initialEvents=[], beforeDate, daysPerPage) {
  const sections = [];
  if (initialEvents.length) {
    for (let i = 1; i <= daysPerPage; i++) {
      const nextDate = moment(beforeDate).add(-(i), 'day');
      sections.push(getNextDayEvents(initialEvents, nextDate));
    }
  }
  return sections.reverse();
}

/**
 * 
 * @param { Array } events 
 * @param { Date } afterDate 
 * @param { Number } DAYS_PER_PAGE 
 * @returns a SectionListData of events with empty days omitted
 */
function generateNextEvents(events=[], refDate, DAYS_PER_PAGE=3, before) {
  const sections = [];
  console.log('refDate', moment(refDate).toISOString());
  let nextDate = getNextDate(events, moment(refDate), before);
  if (events.length && nextDate) {
    for (let i = 0; i < DAYS_PER_PAGE; i++) {
      console.log(i, nextDate.toISOString());
      sections.push(getNextDayEvents(events, nextDate));
      nextDate = getNextDate(events, nextDate, before);
      if (!nextDate) break;
    }
  }
  return sections;
}

/**
 * 
 * @param { Array } events 
 * @param { Date } afterDate 
 * @param { Number } DAYS_PER_PAGE 
 * @returns a SectionListData of events with empty days omitted
 */
function generatePreviousEvents(events=[], beforeDate, DAYS_PER_PAGE) {
  return generateNextEvents(events, moment(beforeDate), DAYS_PER_PAGE, true).reverse();
}

/* Return next available event date */
function getNextDate(events=[], refDate, before) {
  return uniqWith(events.map((currentEvent) => {
    const eventDate = moment(currentEvent.startAt);
    const endDate = moment(currentEvent.endAt);
    const untilAt = currentEvent.until ? moment(currentEvent.until) : undefined;
    const repeat = getRepeat(currentEvent.repeat);
    let recurrence;
    if (repeat) {
      if (repeat === 'weekdays') {
        recurrence = eventDate.recur(untilAt).every(weekdays).daysOfWeek();
      } else {
        recurrence = eventDate.recur(untilAt).every(1, repeat);
      }
      recurrence.fromDate(refDate);
      const nextDates = before ? recurrence.previous(1) : recurrence.next(1);
      const nextDate = nextDates[0];
      const validStart = nextDate.isAfter(eventDate, 'day');
      if (untilAt && nextDate.isAfter(untilAt, 'day')) {
        // do nothing
      } else if (validStart) {
        return nextDate.startOf('day');
      }
    } else if (eventDate.twix(endDate).contains(refDate)) {
      // console.log('contains', currentEvent.title, endDate.toISOString())
      recurrence = eventDate.recur(endDate).every(1).day().fromDate(refDate);
      const nextDates = before ? recurrence.previous(1) : recurrence.next(1);
      const nextDate = nextDates[0];
      console.log('contains', currentEvent.title, nextDate.toISOString());
      return nextDate.startOf('day');
    }
    return eventDate.startOf('day');
  }).filter(date => {
    if (before) return date.isBefore(refDate, 'day');
    return date.isAfter(refDate, 'day');
  }).sort((a, b) => {
    if (before) return -(a - b);
    return a - b;
  }), (a, b) => a.toISOString() === b.toISOString())[0];
};


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
    const isExtended = eventDate.twix(currentEvent.endAt).contains(refDate);
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
    } else if (!repeat && (eventDate.isSame(refDate, 'day') || isExtended)) {
      accumulator.data.push(currentEvent);
    }
    accumulator.data = sortBy(accumulator.data, 'startAt');
    return accumulator;
  }, {
    data: [],
    title: refDate.startOf('day').toISOString(),
  });
}

const getEvents = (events) => {
  return events.map((currentEvent) => {
    const eventDate = moment(currentEvent.startAt);
    const repeat = getRepeat(currentEvent.repeat);
    const untilAt = currentEvent.until ? moment(currentEvent.until) : undefined;
    let recurrence;
    if (repeat) {
      if (repeat === 'weekdays') {
        recurrence = eventDate.recur().every(weekdays).daysOfWeek();
      } else {
        recurrence = eventDate.recur().every(1, repeat);
      }
      recurrence.fromDate(moment().add(-1, 'day')); // it exclusive so minus one day to include today
      const end = moment(currentEvent.endAt);
      
      const startSec = eventDate.seconds();
      const startMins = eventDate.minutes();
      const startHours = eventDate.hours();

      const duration = Math.abs(moment.duration(eventDate.diff(end)));

      const nextDates = recurrence.next(1);
      const isConcluded = untilAt ? moment(startAt).isAfter(untilAt) : false;
      const nextDate = isConcluded ? untilAt : nextDates[0]
      const startAt = nextDate.local().seconds(startSec).minutes(startMins).hours(startHours).toISOString();
      const endAt = moment(startAt).local().add(duration).toISOString();

      return  Object.assign({}, currentEvent, {
        startAt,
        endAt,
        isConcluded
      });
    }
    return currentEvent;
  });
};

function hasPreviousEvents(events, { beforeDate }) {
  const refDate = moment(beforeDate);
  return events.some((event) => {
    const eventDate = moment(event.startAt);
    return eventDate.isSameOrBefore(refDate);
  });
}

function hasMoreEvents(events, { afterDate }) {
  const refDate = moment(afterDate);
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
  getNextDate,
  getPreviousEvents,
  hasPreviousEvents,
  hasMoreEvents,
  generateNextEvents,
  generatePreviousEvents
}