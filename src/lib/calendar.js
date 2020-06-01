import moment from 'moment';
import repeat from './repeat';
import {
	getWeekFromNow,
} from './time';

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
	});
	data.sort((a, b) => moment(a.startAt).diff(moment(b.startAt)));
	return data;
}

const cache = {};
function* EventSectionGenerator(events, previous) {
	const someday =  extractDates(events, previous);
	const order = previous ? -1 : 1;
	const dates = Array
		.from(new Set(getWeekFromNow(previous).concat(someday))) // remove duplicates 
		// .from(new Set([moment().startOf('day').toISOString()].concat(someday))) // remove duplicates 
		.sort((a, b) => moment(a).diff(b) * order);
	// console.log(JSON.stringify(dates, null, 2))

	for (let date of dates) {
		const data = [];
		// const s = Date.now();
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
		// console.log(events.length, "Items:", Date.now() -s);
		data.sort((a, b) => moment(a.startAt).diff(b.startAt));
		const items = [
			{
				data,
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
	const previousStartMoment = moment(event.startAt);

	const hr = previousStartMoment.hour();
	const min = previousStartMoment.minute();
	const sec = previousStartMoment.second();
	const nextMoment = moment(date).hour(hr).minute(min).second(sec);
	startAt = nextMoment.toISOString();

	const previousEndMoment = moment(event.endAt);

	const duration = moment.duration(previousEndMoment.diff(previousStartMoment));
	if (span) {
		// startAt = moment(event.startAt).toISOString();
		const hr = previousEndMoment.hour();
		const min = previousEndMoment.minute();
		const sec = previousEndMoment.second();
		endAt = moment(span).hour(hr).minute(min).second(sec).toISOString();
	} else {
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