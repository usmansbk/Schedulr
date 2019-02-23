import moment from 'moment';

/**
  * @param { Array } initialEvents - an array of calendar events
  * @param { Date } afterDate - date to start from
  * @return 
  */
function getNextDayEvents(initialEvents, afterDate=moment().toISOString() ) {
  const item = {
    data: [],
    title: moment(afterDate).add(1, 'day').startOf('day').toISOString()
  };
  return item;
}

function getPreviousDayEvents(initialEvents, beforeDate=moment() ) {

}

export {
  getNextDayEvents,
  getPreviousDayEvents
}