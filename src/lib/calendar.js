import moment from 'moment';
import repeat from './repeat';

// Get next seven days starting from today 
export const getDaysFromNow = (previous, num=1) => {
	const days = num;
  const start = previous ? 1 : 0;
  const direction = previous ? -1 : 1;
  let dates = [];
  for (let i = start; i <= days; i++) {
    const date = moment().add(i * direction, 'day').startOf('day').toISOString();
    dates.push(date);
  }
  return dates;
};

function extractDates(events, previous) {
	const direction = previous ? -1 : 0;
	let dates = [];
	events.forEach(e => {
		const recur = repeat(e.startAt)
			.every(e.recurrence)
			.from(moment().add(direction, 'day'))
			.until(e.until);
		
		const nextDate = previous ? recur.previousDate() : recur.nextDate();
		if (nextDate) {
			dates.push(nextDate.toISOString());
		}
	});
	return dates;
}

const flatCache = {};
function EventFlatList(events=[]) {
	const data = [];
	events.forEach(event => {
		// deleted bookmarks are represented as string 
		if (typeof event === "object") {
			const date = moment().startOf('day').toISOString();
			const key = `${event.id}-${event.isBookmarked}-${event.updatedAt}-${date}`;
			const cached = flatCache[key];
			if (cached) {
				data.push(cached);
			} else {
				const recur = repeat(event.startAt)
					.span(event.endAt)
					.maybeFrom(date)
					.every(event.recurrence)
					.until(event.until);

				const newEvent = update(event, recur.nextDate(), recur.nextSpan());
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
	events.forEach(event => {
		const key = `${previous}-${event.id}-${event.updatedAt}-${event.isBookmarked}-${date}`;
		const cached = cache[key];
		if (cached) {
			if (typeof cached !== "string") {
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
				cache[key] = "__not__match__";
			}
		}
	});
	data.sort((a, b) => moment(a.startAt).diff(b.startAt));
	return data;
}

function* EventInfiniteSectionGenerator(events, previous) {
	const direction = previous ? -1 : 1;
	// previous should start from yesterday
	let date = moment().add(previous ? -1 : 0, 'day').startOf('day');
	while(date) {
		const items = [
			{
				data: process(events, date, previous),
				title: date
			}
		] ;
		yield ({
			items,
			nextToken: date
		});
		date = moment(date).add(direction, 'day').toISOString();
	}
}

function* EventFiniteSectionGenerator(events, previous) {
	const order = previous ? -1 : 1;
	const dates = Array.from(new Set(extractDates(events, previous)))
		.sort((a, b) => moment(a).diff(b) * order);

	for (let date of dates) {
		const items = [
			{
				data: process(events, date, previous),
				title: date
			}
		] ;
		yield ({
			items,
			nextToken: date
		});
	}
}

export function update(event, date, span) {
	let startAt, endAt;

	const previousEndMoment = moment(event.endAt);

	if (span) {
		startAt = moment(date).toISOString();
		endAt = moment(span).toISOString();
	} else {
		const previousStartMoment = moment(event.startAt);

		const hr = previousStartMoment.hour();
		const min = previousStartMoment.minute();
		const sec = previousStartMoment.second();

		const duration = moment.duration(previousEndMoment.diff(previousStartMoment));
		const nextMoment = moment(date).hour(hr).minute(min).second(sec);
		startAt = nextMoment.toISOString();
		endAt = nextMoment.clone().add(duration).toISOString();
	}
	
	return Object.assign({}, event, {
		startAt,
		endAt,
		raw_startAt: event.startAt,
		raw_endAt: event.endAt
	});
}

export {
	EventSectionGenerator,
	EventFlatList
};