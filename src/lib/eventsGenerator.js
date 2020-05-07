import moment from 'moment';
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
 * @return { Event[] } events 
 */
function* NextDayEventsIterator(events, previous) {

	const order = previous ? -1 : 1;

	// sort the events in ascending order. If previous param is set, then sort in descending order
	const sorted = events.sort((a, b) => moment(a.startAt).diff(moment(b.startAt)) * order);

	// get a set of dates including [next 7 days]
	const dates = new Set(sorted.map(e => moment(e.startAt).startOf('day').toISOString()));

	// for each date in dates yield the events that are valid
	for (let date of dates) {
		let nextEvents = [];
		sorted.forEach(event => {
			if (match(event, date)) {
				nextEvents.push(process(event, date));
			}
		});
		if (nextEvents.length){
			yield ({
				data: nextEvents,
				title: date
			});
		}
	}
}

// Checks if event will occur in the given date
function match(event, date) {
	const startMoment = moment(event.startAt);
	const endMoment = moment(event.endAt);
	const dateMoment = moment(date);

	const isSameDay = startMoment.isSame(dateMoment, 'day');
	const isOngoing = dateMoment.isSameOrBefore(endMoment, 'day');
	const isCancelled = event.isCancelled;
	let isRecurring = true;
	if (event.recurrence !== 'NEVER') {
		const finalMoment = moment(event.until);
		isRecurring = dateMoment.isSameOrBefore(finalMoment, 'day');
	}
	return !isCancelled && (isSameDay || isOngoing || isRecurring);
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
	const startAt = nextMoment.toISOString();

	const previousEndMoment = moment(event.endAt);
	const isExtended = nextMoment.isBetween(previousStartMoment, previousEndMoment, 'day', '[]');

	const duration = moment.duration(previousEndMoment.diff(previousStartMoment));
	const endAt = nextMoment.clone().add(duration).toISOString();
	let isConcluded = false;
	if (event.until) {
		const finalMoment = moment(event.until);
		isConcluded = nextMoment.isAfter(finalMoment);
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
  NextDayEventsIterator
};