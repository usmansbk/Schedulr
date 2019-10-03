import moment from 'moment';
import 'moment-recur';
import uniqWith from 'lodash.uniqwith';
import memoize from 'lodash.memoize';
import { sortBy } from 'lib/utils';

export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
];

function getInterval(recurrence) {
  switch (recurrence) {
    case 'DAILY': return 'days';
    case 'WEEKDAYS': return 'weekdays';
    case 'WEEKLY':  return 'weeks';
    case 'MONTHLY': return 'months';
    case 'YEARLY': return 'years';
    default: return null;
  }
}

/**
 * 
 * @param { Array } events 
 * @param { Date } afterDate 
 * @param { Number } DAYS_PER_PAGE 
 * @returns a SectionListData of events with empty days omitted
 */
function generateNextEvents(events=[], refDate, DAYS_PER_PAGE=3, before=false) {
  const sections = [];
  let nextDate = getNextDate(events, moment(refDate), before);
  if (events.length && nextDate) {
    for (let i = 0; i < DAYS_PER_PAGE; i++) {
      sections.push(processNextDayEvents(events, nextDate));
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
  return generateNextEvents(events, beforeDate, DAYS_PER_PAGE, true).reverse();
}

/* Return next available event date */
const getNextDate = memoize((events=[], refDate, before) => {
  return uniqWith(events.map((currentEvent) => {
    const eventDate = moment(currentEvent.startAt);
    const endDate = moment(currentEvent.endAt);
    const untilAt = currentEvent.until ? moment(currentEvent.until).endOf('day') : undefined;
    const interval = getInterval(currentEvent.recurrence);
    const isValid = !currentEvent.isCancelled;
    let recurrence;
    if (interval && isValid) {
      if (interval === 'weekdays') {
        recurrence = eventDate.recur().every(weekdays).daysOfWeek();
      } else {
        recurrence = eventDate.recur().every(1, interval);
      }
      recurrence.fromDate(refDate);
      const nextDates = before ? recurrence.previous(1) : recurrence.next(1);
      const nextDate = nextDates[0];
      const validStart = nextDate.isAfter(eventDate, 'day');
      if (untilAt && nextDate.isAfter(untilAt, 'day')) {
        // do nothing
      } else if (validStart) {
        return nextDate.local().startOf('day');
      } else if (interval === 'weekdays') {
        // Prevent weekends
        return null;
      }
    } else if (isValid && moment(refDate).isBetween(eventDate, endDate, null, '[]')) {
      recurrence = eventDate.recur(endDate).every(1).day().fromDate(refDate);
      const nextDates = before ? recurrence.previous(1) : recurrence.next(1);
      const nextDate = nextDates[0];
      const shouldReturn = nextDate.isBetween(eventDate, endDate, null, '[]');

      if (shouldReturn) return nextDate.local().startOf('day');
    }
    return eventDate.startOf('day');
  }).filter(date => {
    if (!date) return false;
    if (before) return date.isBefore(refDate, 'day');
    return date.isAfter(refDate, 'day');
  }).sort((a, b) => {
    if (before) return -(a - b);
    return a - b;
  }), (a, b) => a.toISOString() === b.toISOString())[0];
}, (...args) => JSON.stringify(args));

/**
  * Returns a SectionList item of a day's events 
  * @param { Array } initialEvents - an array of calendar events
  * @param { Date } afterDate - date to start from
  * @return 
*/
const processNextDayEvents = memoize((initialEvents, nextDate) => {
  let refDate = moment();
  if (nextDate) refDate = moment(nextDate);

  return initialEvents.reduce((accumulator, currentEvent) => {
    const eventDate = moment(currentEvent.startAt);
    const endDate = moment(currentEvent.endAt);
    const interval = getInterval(currentEvent.recurrence);
    const isExtended = refDate.isBetween(eventDate, endDate, 'D', '[]');
    const isValid = currentEvent.until ? refDate.isSameOrBefore(moment(currentEvent.until), 'day') : true;

    if (interval && !currentEvent.isCancelled && isValid) {
      let recurrence;
      if (interval === 'weekdays') {
        recurrence = eventDate.recur().every(weekdays).daysOfWeek();
      } else {
        recurrence = eventDate.recur().every(1, interval);
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
          endAt,
          ref_date: refDate.toISOString()
        }));
      }
    } else if (!interval && eventDate.isSame(refDate, 'day') || isExtended) {
      const currentEventWithMeta = Object.assign({}, currentEvent, {
        ref_date: refDate.toISOString()
      });
      accumulator.data.push(currentEventWithMeta);
    }
    accumulator.data = sortBy(accumulator.data, 'startAt');
    return accumulator;
  }, {
    data: [],
    title: refDate.startOf('day').toISOString(),
  });
}, (...args) => JSON.stringify(args));

// Returns a flat list of latest events dates
function processEvents(events) {
  if (!events) return [];
  return events.map((currentEvent) => {
    if (typeof currentEvent === 'string') return currentEvent;
    const eventDate = moment(currentEvent.startAt);
    const interval = getInterval(currentEvent.recurrence);
    const untilAt = currentEvent.until ? moment(currentEvent.until) : undefined;
    let recurrence;
    if (interval) {
      if (interval === 'weekdays') {
        recurrence = eventDate.recur().every(weekdays).daysOfWeek();
      } else {
        recurrence = eventDate.recur().every(1, interval);
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
        raw_startAt: currentEvent.startAt,
        raw_endAt: currentEvent.endAt,
        ref_date: moment().toISOString(),
        isConcluded
      });
    }
    return Object.assign({}, currentEvent, {
      raw_startAt: currentEvent.startAt,
      raw_endAt: currentEvent.endAt,
      ref_date: moment().toISOString(),
    });
  });
};

export {
  processEvents,
  getNextDate,
  generateNextEvents,
  generatePreviousEvents
}