import {I18n} from 'aws-amplify';
import {capitalize} from './utils';
import {isPastDate, isCurrentDate} from './time';
import {isAfter, date} from './date';
import {ONE_TIME_EVENT} from './constants';

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
export const isEventCancelled = ({cancelledDates, startAt, isCancelled}) => {
  return isCancelled || (cancelledDates && cancelledDates.includes(startAt));
};

/**
 *
 * @param { Event } event
 * @return {string} Returns the current status of an event
 */
export const getStatus = ({
  cancelledDates = [],
  startAt,
  endAt,
  until,
  isCancelled,
}) => {
  if (until) {
    const isConcluded = isAfter(date(), until);
    if (isConcluded) return 'concluded';
  }
  const cancelled = isEventCancelled({cancelledDates, startAt, isCancelled});
  if (cancelled) return 'cancelled';

  const isEnded = isPastDate(endAt);
  if (isEnded) return 'done';

  const isOngoing = isCurrentDate(startAt, endAt, true);
  if (isOngoing) return 'ongoing';

  return 'upcoming';
};

/**
 *
 * @param { Event } event
 * @return { boolean} Whether an event is cancelled or date expired
 */
export const isEventValid = (event) => {
  const {startAt, endAt, recurrence, until, isCancelled} = event;
  const cancelledDates = event.cancelledDates || [];
  return (
    (recurrence !== ONE_TIME_EVENT && isCurrentDate(date(), until)) ||
    (isCurrentDate(date(), endAt) &&
      !isEventCancelled({cancelledDates, startAt, isCancelled}))
  );
};

/**
 *
 * @param {string} recurrence
 * @returns {string} daily, weekly, every weekday, monthly, or yearly
 */
export const parseRepeat = (recurrence) => {
  const val = recurrence.toLowerCase();
  switch (val) {
    case 'never':
      return '';
    case 'daily':
      return 'daily';
    case 'weekly':
      return 'weekly';
    case 'weekdays':
      return 'every weekday';
    case 'monthly':
    case 'monthly_day':
      return 'monthly';
    case 'yearly':
      return 'yearly';
    default:
      return recurrence;
  }
};

/**
 *
 * @param { Event } event
 * @returns {string} Formatted event date in human friendly form
 */
export const captionDetails = ({allDay, recurrence, category, duration}) => {
  let caption;

  if (allDay) {
    caption = I18n.get('EVENT_CAPTION_allDay')({
      type: category,
      recurrence: I18n.get(recurrence),
    });
  } else {
    caption = I18n.get('EVENT_CAPTION_xDurationRecurrenceType')({
      duration,
      recurrence: I18n.get(recurrence),
      type: category,
    });
  }
  let formatted = capitalize(caption.trim());
  return formatted;
};
