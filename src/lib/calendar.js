import {add, startOf, toISOString, date, diff} from './date';
import repeat from './repeat';

function* EventSectionGenerator(events, previous) {
  yield* EventInfiniteSectionGenerator(events, previous);
}

const cache = {};
function process(events, date, previous) {
  const data = [];
  events.forEach((event) => {
    const key = `${previous}-${event.id}-${event.updatedAt}-${event.isBookmarked}-${date}`;
    const cached = cache[key];
    if (cached) {
      if (typeof cached !== 'string') {
        data.push(cached);
      }
    } else {
      const recur = repeat(event)
        .from(date)
        .every(event.recurrence)
        .until(event.until);
      if (recur.matches(date)) {
        data.push(event);
        cache[key] = event;
      } else {
        cache[key] = '__not__match__';
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

export {EventSectionGenerator};
