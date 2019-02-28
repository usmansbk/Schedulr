import moment from 'moment';
import 'moment-recur';

function getRepeat(recur) {
  switch (recur) {
    case 'DAILY': return 'days';
    case 'WEEKLY':  return 'weeks';
    case 'YEARLY': return 'years';
    default: return null;
  }
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
    if (repeat) {
      const recurrence = eventDate.recur().every(1, repeat);
      const hasNext = recurrence.matches(refDate.format('l'));
      if (hasNext) {
        accumulator.data.push(currentEvent);
      }
    } else if (eventDate.isSame(refDate, 'day')) {
      accumulator.data.push(currentEvent);
    }
    return accumulator;
  }, {
    data: [],
    title: refDate.startOf('day').toISOString()
  });
}

function getPreviousDayEvents(initialEvents, beforeDate=moment() ) {

}

export {
  getNextDayEvents,
  getPreviousDayEvents
}