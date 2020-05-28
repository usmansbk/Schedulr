import moment from 'moment';
import repeat from './repeat';
import {
	getWeekFromNow,
	isSpanDays,
} from './time';

function extractDates(events) {
	return events.map(e => {
		const nextDate = repeat(e.startAt)
			.every(e.recurrence)
			.from(moment())
			.until(e.until)
			.nextDate().toISOString();
		return nextDate;
	});
}

function* EventSectionGenerator(events, previous) {
	const someday = extractDates(events);
	const dates = Array.from(new Set(getWeekFromNow(previous).concat(someday)));
	dates.sort((a, b) => moment(a).diff(moment(b)));

	for (let date of dates) {
		const data = [];
		events.forEach(event => {
			const recur = repeat(event.startAt)
											.every(event.recurrence)
											.until(event.until);
			if (!event.isCancelled && recur.matches(date)) {
				data.push(update(event, date));
			}
		});
		data.sort((a, b) => moment(a.startAt).diff(b.startAt))
		const items = [
			{
				data,
				title: date
			}
		] ;
		yield ({
			items,
			afterDate: date,
			beforeDate: date
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
	let endAt = nextMoment.clone().add(duration).toISOString();

	let isConcluded = false;
	if (event.until) {
		const finalMoment = moment(event.until);
		isConcluded = nextMoment.isAfter(finalMoment);
	}

	const isExtended = isSpanDays(previousStartMoment, previousEndMoment);
	if (isExtended || isConcluded) {
		startAt = previousStartMoment.toISOString();
		endAt = previousEndMoment.toISOString();
	}

	return Object.assign({}, event, {
		startAt,
		endAt,
		isExtended,
		isConcluded,
		ref_date: date
	});
}

export {
  EventSectionGenerator
};