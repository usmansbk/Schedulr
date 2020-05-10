import moment from 'moment';
import { nextSevenDays } from './time';
/**
 * 
 * A calendar event
 * @typedef {Object} Event
 * @property {Date} startAt - ISO string of event start date and time
 * @property {Date} endAt - ISO string of end date and time
 * @property {boolean} isCancelled - Indicates whether event is cancelled
 * @property {string} recurrence - How often even should repeat (DAILY, WEEKLY, MONTHLY, YEARLY)
 * @property {Date=} until - Final date of event, if repeating
 * @property {boolean=} forever - Indicates whether event should repeat forever
 */

/**
 * @param { Event[] } events
 * @param { Date } date - start date 
 * @param { boolean= } previous - Get previous day events if true
 * @param { number } [size=1] - number of days to fetch 
 * @return { Event[] } events 
 */
function* EventsGenerator(events, previous) {
	let dates = nextSevenDays(previous);
	for (let date of dates) {
		const data = [];
		events.forEach(event => {
			if (match(event, date)) {
				data.push(process(event, date));
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

// Checks if event will occur in the given date
function match(event, date) {
	const startMoment = moment(event.startAt);
	const endMoment = moment(event.endAt);
	const dateMoment = moment(date);
	// isValid - date is same as or between start and end date

	const isValidStart = startMoment.isSame(dateMoment, 'day');
	const isValid= dateMoment.isBetween(startMoment, endMoment, 'day', '[]');
	const isCancelled = event.isCancelled;
	let isRecurring = false;
	if (event.recurrence !== 'NEVER') {
		if (event.recurrence === 'WEEKDAYS') {
			isRecurring = dateMoment.isoWeekday() < 6;
		} else {
			isRecurring = true;
		}
	}
	if (event.until) {
		const finalMoment = moment(event.until);
		isRecurring = dateMoment.isSameOrBefore(finalMoment, 'day');
	}

	return !isCancelled && (isValid || (isValidStart && isRecurring));
}

/**
 * @param { Event } event - Previous event
 * @param { Date } date - Next event date
 * @return { Event } event - Creates a new event with the given next date
 */
function process(event, date) {
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

	const isExtended = nextMoment.isBetween(previousStartMoment, previousEndMoment, 'day', '[]');
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
  EventsGenerator
};