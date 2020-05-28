import moment from 'moment';
import repeat from './repeat';
import {
	getWeekFromNow,
	isSpanDays,
	getTimeUnit
} from './time';

function* EventSectionGenerator(events, previous) {
	events.sort((a, b) => moment(a.startAt).diff(b.startAt));
	let dates = getWeekFromNow(previous);
	for (let date of dates) {
		const data = [];
		events.forEach(event => {
			const recur = repeat(event.startAt)
											.every(getTimeUnit(event.recurrence))
											.until(event.until);
			if (recur.matches(date)) {
				data.push(update(event, date));
			}
		});
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