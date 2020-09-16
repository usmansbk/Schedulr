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

function extractDates(events, previous) {
  const direction = previous ? -1 : 0;
  let dates = [];
  events.forEach((e) => {
    const recur = repeat(e.startAt)
      .every(e.recurrence)
      .from(add(date(), direction, 'day'))
      .until(e.until);

    const nextDate = previous ? recur.previousDate() : recur.nextDate();
    if (nextDate) {
      dates.push(nextDate.toISOString());
    }
  });
  return dates;
}

const flatCache = {};
function EventFlatList(events = []) {
  const data = [];
  events.forEach((event) => {
    // deleted bookmarked events are represented as string ids
    if (typeof event === 'object') {
      const d = toISOString(startOf(date(), 'day'));
      const key = `${event.id}-${event.isBookmarked}-${event.updatedAt}-${d}`;
      const cached = flatCache[key];
      if (cached) {
        data.push(cached);
      } else {
        const recur = repeat(event.startAt)
          .span(event.endAt)
          .maybeFrom(d)
          .every(event.recurrence)
          .until(event.until);

        const newEvent = update(event, recur.nextDate(), recur.nextSpan());
        data.push(newEvent);
        flatCache[key] = newEvent;
      }
    }
  });
  data.sort((a, b) => diff(a.startAt, b.startAt));
  return data;
}

function* EventSectionGenerator(events, previous, finite) {
  if (finite) {
    yield* EventFiniteSectionGenerator(events, previous);
  } else {
    yield* EventInfiniteSectionGenerator(events, previous);
  }
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
      const recur = repeat(event.startAt)
        .span(event.endAt)
        .from(date)
        .every(event.recurrence)
        .until(event.until);
      if (recur.matches(date)) {
        const newEvent = update(event, date, recur.nextSpan());
        data.push(newEvent);
        cache[key] = newEvent;
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

function* EventFiniteSectionGenerator(events, previous) {
  const order = previous ? -1 : 1;
  const dates = Array.from(new Set(extractDates(events, previous))).sort(
    (a, b) => diff(a, b) * order,
  );

  for (let date of dates) {
    const items = [
      {
        data: process(events, date, previous),
        title: date,
      },
    ];
    yield {
      items,
      nextToken: date,
    };
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

export {EventSectionGenerator, EventFlatList};
