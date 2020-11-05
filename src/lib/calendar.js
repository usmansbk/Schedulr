import moment from 'moment';
import {add, startOf, toISOString, date, diff} from './date';
import repeat from './repeat';

function* EventSectionGenerator(events, previous) {
  yield* EventInfiniteSectionGenerator(events, previous);
}

function process(events, date /*, previous */) {
  const data = [];
  events.forEach((event) => {
    const recur = repeat(event).from(date);
    if (recur.matches(date)) {
      const eventFromDate = update(event, recur.next());
      data.push(eventFromDate);
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
