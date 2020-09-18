import {
  add,
  startOf,
  toISOString,
  date,
  diff,
  getDuration,
  castDateTime,
} from './date';
import repeat from './repeat';

// Get next seven days starting from today
export const getDaysFromNow = (previous, num = 1) => {
  const days = num;
  const start = previous ? 1 : 0;
  const direction = previous ? -1 : 1;
  let dates = [];
  for (let i = start; i <= days; i++) {
    const d = toISOString(startOf(add(date(), i * direction, 'day'), 'day'));
    dates.push(d);
  }
  return dates;
};

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

export function update(event, currentDate, span) {
  let startAt, endAt;

  const previousEnd = date(event.endAt);

  if (span) {
    startAt = toISOString(currentDate);
    endAt = toISOString(span);
  } else {
    const previousStart = date(event.startAt);

    const duration = getDuration(diff(previousEnd, previousStart));
    const next = castDateTime(previousStart, currentDate);
    startAt = toISOString(next);
    endAt = toISOString(add(next, duration));
  }

  return Object.assign({}, event, {
    startAt,
    endAt,
    raw_startAt: event.startAt,
    raw_endAt: event.endAt,
  });
}

export {EventSectionGenerator};
