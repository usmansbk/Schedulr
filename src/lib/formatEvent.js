import moment from 'moment';
import 'twix';
import { I18n } from 'aws-amplify';
import { capitalize } from './utils';
import { getDaysCount, isSpanDays } from './time';

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
export const isEventCancelled = (event) => {
  const { startAt, isCancelled } = event;
  const cancelledDates = event.cancelledDates || [];
  return isCancelled || cancelledDates.includes(startAt);
}

/**
 * 
 * @param { Event } event
 * @return {string} Returns the current status of an event
 */
export const getStatus = ({
  isCancelled,
  cancelledDates = [],
  startAt,
  endAt,
  isConcluded
}) => {
  if (isConcluded) return "concluded";
  const cancelled =  isEventCancelled({ cancelledDates, startAt, isCancelled });
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
  const { isCancelled, startAt, endAt } = event;
  const cancelledDates = event.cancelledDates || [];
  return moment().twix(endAt).isCurrent() && !isEventCancelled({ cancelledDates, startAt, isCancelled });
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
  allDay,
  recurrence,
  category,
  duration,
  startAt,
  endAt,
}) => {
  const spanDays = isSpanDays(startAt, endAt);

  let currentDayCount, totalDayCount;
  if (spanDays) {
    const count = getDaysCount(startAt, endAt);
    currentDayCount = count + 1;
    totalDayCount = getDaysCount(startAt, endAt) + 1;
  }
  let caption;
  if (allDay) {
    caption = I18n.get("EVENT_CAPTION_allDay")({ type: category, recurrence: I18n.get(recurrence) });
  } else {
    if (currentDayCount) {
      caption = I18n.get("EVENT_CAPTION_xthDayOfType")({ currentDayCount, totalDayCount, type: category });
    } else {
      caption = I18n.get("EVENT_CAPTION_xDurationRecurrenceType")({ duration, recurrence: I18n.get(recurrence), type: category });
    }
  }
  let formatted = capitalize(caption.trim());
  return formatted;
};