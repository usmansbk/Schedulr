import moment from 'moment';
import repeat from './repeat';

// Get next seven days starting from today
export const getDaysFromNow = (previous, num = 1) => {
  const days = num;
  const start = previous ? 1 : 0;
  const direction = previous ? -1 : 1;
  let dates = [];
  for (let i = start; i <= days; i++) {
    const date = moment()
      .add(i * direction, 'day')
      .startOf('day')
      .toISOString();
    dates.push(date);
  }
  return dates;
};

function extractDates(events, previous) {
  const direction = previous ? -1 : 0;
  let dates = [];
  events.forEach((e) => {
    const recur = repeat(e.startAt, e.endAt)
      .every(e.recurrence)
      .from(moment().add(direction, 'day'))
      .until(e.until);

    const [startAt] = recur.next();
    dates.push(moment(startAt).startOf('day').toISOString());
  });
  return dates;
}

const flatCache = {};
function EventFlatList(events = []) {
  const data = [];
  events.forEach((event) => {
    // deleted bookmarks are represented as string
    if (typeof event === 'object') {
      const date = moment().startOf('day').toISOString();
      const key = `${event.id}-${event.isBookmarked}-${event.updatedAt}-${date}`;
      const cached = flatCache[key];
      if (cached) {
        data.push(cached);
      } else {
        const next = repeat(event.startAt, event.endAt)
          .every(event.recurrence)
          .from(date)
          .until(event.until)
          .next();

        const [startAt, endAt] = next;
        const newEvent = update(event, startAt, endAt);
        data.push(newEvent);
        flatCache[key] = newEvent;
      }
    }
  });
  data.sort((a, b) => moment(a.startAt).diff(moment(b.startAt)));
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
      const recur = repeat(event.startAt, event.endAt)
        .every(event.recurrence)
        .from(date)
        .until(event.until);
      if (recur.matches(date)) {
        const [startAt, endAt] = previous ? recur.previous() : recur.next();
        const newEvent = update(event, startAt, endAt);
        data.push(newEvent);
        cache[key] = newEvent;
      } else {
        cache[key] = '__not__match__';
      }
    }
  });
  data.sort((a, b) => moment(a.startAt).diff(b.startAt));
  return data;
}

function* EventInfiniteSectionGenerator(events, previous) {
  const direction = previous ? -1 : 1;
  // previous should start from yesterday
  let date = moment()
    .add(previous ? -1 : 0, 'day')
    .startOf('day');
  while (date) {
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
    date = moment(date).add(direction, 'day').toISOString();
  }
}

function* EventFiniteSectionGenerator(events, previous) {
  const order = previous ? -1 : 1;
  const dates = Array.from(new Set(extractDates(events, previous))).sort(
    (a, b) => moment(a).diff(b) * order,
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

export function update(event, startAt, endAt) {
  return Object.assign({}, event, {
    startAt,
    endAt,
    raw_startAt: event.startAt,
    raw_endAt: event.endAt,
  });
}

export {EventSectionGenerator, EventFlatList};
