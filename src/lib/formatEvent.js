import moment from 'moment';
import 'twix';
import { I18n } from 'aws-amplify';
import { capitalize } from './utils';
import { getDaysCount, isSpanDays } from './time';
import { ONE_TIME_EVENT } from './constants'; 
/**
 * 
 * A calendar event
 * @typedef {Object} Event
 * @property {Date} startAt - ISO string of event start date and time
 * @property {Date} endAt - ISO string of end date and time
 * @property {string} recurrence - How often even should repeat (DAILY, WEEKLY, MONTHLY, YEARLY)
 * @property {Date=} until - Final date of event, if repeating
 * @property {boolean=} forever - Indicates whether event should repeat forever
 */

 /**
  * 
  * @param {string} category 
  */
export const getCategory = (category) => {
  if (!category) return '';
  return I18n.get(category);
};

/**
 * 
 * @param {Event} event 
 * @returns { boolean } - check where event is cancelled
 */
export const isEventCancelled = ({cancelledDates, startAt, _startAt }) => {
  return cancelledDates && (cancelledDates.includes(startAt) ||
  (cancelledDates.includes(_startAt)) );
}

/**
 * 
 * @param { Event } event
 * @return {string} Returns the current status of an event
 */
export const getStatus = ({
  cancelledDates = [],
  startAt,
  _startAt,
  endAt,
  until,
}) => {
  if (until) {
    const isConcluded = moment().isAfter(moment(until));
    if (isConcluded) return "concluded";
  }
  const cancelled =  isEventCancelled({ cancelledDates, startAt, _startAt });
  if (cancelled) return "cancelled";
  const isEnded = moment().twix(endAt).isPast();
  if (isEnded) return "done";
  const isOngoing = moment(startAt).twix(endAt).isCurrent();
  if (isOngoing) return "ongoing";
  return "upcoming";
};

/**
 * 
 * @param { Event } event
 * @return { boolean} Whether an event is cancelled or date expired
 */
export const isEventValid = (event) => {
  const { startAt, endAt, recurrence, until } = event;
  const cancelledDates = event.cancelledDates || [];
  return (
    (
      recurrence !== ONE_TIME_EVENT &&
      moment().twix(until).isCurrent()
    ) || 
    (moment().twix(endAt).isCurrent() &&
    !isEventCancelled({ cancelledDates, startAt }))
  );
};

/**
 * 
 * @param {string} recurrence 
 * @returns {string} daily, weekly, every weekday, monthly, or yearly
 */
export const parseRepeat = (recurrence) => {
  const val = recurrence.toLowerCase();
  switch(val) {
    case 'never': return '';
    case 'daily': return 'daily';
    case 'weekly': return 'weekly';
    case 'weekdays': return 'every weekday';
    case 'monthly': case 'monthly_day': return 'monthly';
    case 'yearly': return 'yearly';
    default: return recurrence;
  }
};

/**
 * 
 * @param { Event } event
 * @returns {string} Formatted event date in human friendly form
 */
export const captionDetails = ({
  from,
  allDay,
  recurrence,
  category,
  duration,
  // startAt,
  // endAt,
  // _endAt,
}) => {
  let caption;
  // const [currentDayCount, totalDayCount] = count({
  //   startAt,
  //   endAt,
  //   from,
  //   _endAt
  // });

  if (allDay) {
    caption = I18n.get("EVENT_CAPTION_allDay")({ type: category, recurrence: I18n.get(recurrence) });
  } else {
    // if (currentDayCount) {
    //   caption = I18n.get("EVENT_CAPTION_xthDayOfType")({ currentDayCount, totalDayCount, type: category });
    // } else {
      caption = I18n.get("EVENT_CAPTION_xDurationRecurrenceType")({ duration, recurrence: I18n.get(recurrence), type: category });
    // }
  }
  let formatted = capitalize(caption.trim());
  return formatted;
};

function count({ startAt, endAt, from, _endAt }) {
  const spanDays = isSpanDays(startAt, endAt);

  let currentDayCount, totalDayCount;
  if (spanDays) {
    totalDayCount = getDaysCount(startAt, _endAt);
    const count = getDaysCount(startAt, from);
    currentDayCount = count;
  }
  return [currentDayCount, totalDayCount];
}