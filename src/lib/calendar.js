import moment from 'moment';
import {add, startOf, toISOString, date, diff} from './date';
import repeat from './repeat';

function* EventSectionGenerator(events, previous) {
  yield* EventInfiniteSectionGenerator(events, previous);
}

const cache = {};
function process(events, date, previous) {
  const data = [];
  events.forEach((event) => {
    const key = `${previous}-${event.id}-${event.isOffline}-${event.updatedAt}-${date}`;
    const cached = cache[key];
    if (cached) {
      if (typeof cached !== 'string') {
        data.push(cached);
      }
    } else {
      const recur = repeat(event).from(date);
      if (recur.matches(date)) {
        const eventFromDate = update(event, recur.next());
        data.push(eventFromDate);
        cache[key] = eventFromDate;
      } else {
        cache[key] = '__no__match__';
      }
    }
  });
  data.sort((a, b) => diff(a.startAt, b.startAt));
  return data;
}

function* EventInfiniteSectionGenerator(events, previous) {
  const direction = previous ? -1 : 1;
  // previous should start from yesterday
  let d = startOf(add(date(), previous ? -1 : 0, 'day'), 'day');
  while (d) {
    const items = [
      {
        data: process(events, d, previous),
        title: d,
      },
    ];
    yield {
      items,
      nextToken: d,
    };
    d = toISOString(add(d, direction, 'day'));
  }
}

export function nextEvent(event, from) {
  const nextEventDate = repeat(event).from(from);
  return update(event, nextEventDate.next());
}

function update(event, date) {
  const {startAt, endAt} = event;
  const startDate = moment(date);
  const startMoment = moment(startAt);
  const endMoment = moment(endAt);

  const duration = endMoment.diff(startMoment, 'milliseconds');
  const startFromDate = startDate
    .hour(startMoment.hour())
    .minute(startMoment.minute())
    .second(startMoment.second());
  const endFromDate = startDate.clone().add(duration, 'milliseconds');
  return Object.assign({}, event, {
    startAt: startFromDate.toISOString(),
    endAt: endFromDate.toISOString(),
  });
}

export {EventSectionGenerator};
