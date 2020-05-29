import moment from 'moment';
import repeat from './repeat';
import {
	getWeekFromNow,
	// isSpanDays,
	// getDaysCount,
} from './time';

function extractDates(events, previous) {
	const direction = previous ? -1 : 0;
	let dates = [];
	events.forEach(e => {
		const recur = repeat(e.startAt)
			.span(e.endAt)
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

function* EventSectionGenerator(events, previous) {
	const someday =  extractDates(events, previous);
	const dates = Array.from(new Set(getWeekFromNow(previous).concat(someday)));
	const order = previous ? -1 : 1;
	dates.sort((a, b) => moment(a).diff(b) * order); // dont delete no matter what

	for (let date of dates) {
		const data = [];
		events.forEach(event => {
			const recur = repeat(event.startAt)
											.span(event.endAt)
											.every(event.recurrence)
											.until(event.until);
			if (!event.isCancelled && recur.matches(date)) {
				data.push(update(event, date));
			}
		});
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

function update(event, date) {
	const previousStartMoment = moment(event.startAt);

	const hr = previousStartMoment.hour();
	const min = previousStartMoment.minute();
	const sec = previousStartMoment.second();

	const nextMoment = moment(date).hour(hr).minute(min).second(sec);
	let startAt = nextMoment.toISOString();

	const previousEndMoment = moment(event.endAt);
	const duration = moment.duration(previousEndMoment.diff(previousStartMoment));
	let endAt = nextMoment.clone().add(duration);

	let isConcluded = false;
	if (event.until) {
		const finalMoment = moment(event.until);
		isConcluded = nextMoment.isAfter(finalMoment);
		if (isConcluded) {
			startAt = previousStartMoment.toISOString();
			endAt = previousEndMoment.toISOString();
		}
	}

	// const isExtended = isSpanDays(previousStartMoment, previousEndMoment);
	// if (isExtended) {
		// startAt = previousStartMoment.toISOString();
	// }
	
	return Object.assign({}, event, {
		startAt,
		endAt: endAt.toISOString(),
		isConcluded,
		// isExtended: isExtended,
	});
}

export {
  EventSectionGenerator
};