import moment from 'moment';
import 'moment-recur';
import { sortBy } from '../lib/sectionizr';

function getRepeat(recur) {
  switch (recur) {
    case 'DAILY': return 'days';
    case 'WEEKLY':  return 'weeks';
    case 'MONTHLY': return 'months';
    case 'YEARLY': return 'years';
    default: return null;
  }
}

function getNextEvents(initialEvents=[], afterDays, daysPerPage) {
  const sections = [];
  for (let i = afterDays; i < afterDays + daysPerPage; i++) {
    const nextDate = moment().add(i, 'day').toISOString();
    sections.push(getNextDayEvents(initialEvents, nextDate));
  }
  return sections;
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
    const shouldRecur = currentEvent.until ? eventDate.isSameOrBefore(moment(currentEvent.until)) : true;

    if (shouldRecur && repeat && !currentEvent.isCancelled) {
      const recurrence = eventDate.recur().every(1, repeat);
      const hasNext = recurrence.matches(refDate.format('l'));
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
    } else if (eventDate.isSame(refDate, 'day')) {
      accumulator.data.push(currentEvent);
    }
    accumulator.data = sortBy(accumulator.data, 'startAt');
    return accumulator;
  }, {
    data: [],
    title: refDate.startOf('day').toISOString()
  });
}

function getPreviousDayEvents(initialEvents, beforeDate=moment() ) {

}

export {
  getNextEvents,
  getPreviousDayEvents
}