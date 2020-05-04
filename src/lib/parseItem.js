import moment from 'moment';
import 'twix';
import { I18n } from 'aws-amplify';
import { capitalize } from './utils';
import { momentCounter } from './time';

export const getCategory = (category) => {
  if (!category) return '';
  return I18n.get(category);
};

export const isEventCancelled = (event) => {
  const { startAt, isCancelled } = event;
  const cancelledDates = event.cancelledDates || [];
  return isCancelled || cancelledDates.includes(startAt);
}

/**
 * 
 * @param {{startAt: string, endAt: string, cancelledDates: string[], isCancelled: boolean, isConcluded: boolean}} event 
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
 * @param {{startAt: string, endAt: string, cancelledDates: string[], isCancelled: boolean}} event 
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
 * @param {{allDay: boolean, recurrence: string, category: string, duration: string, startAt: string, endAt: string, ref_date: ?string}} event 
 * @returns {string} Formatted event date in human friendly form
 */
export const captionDetails = ({
  allDay,
  recurrence,
  category,
  duration,
  startAt,
  endAt,
  ref_date
}) => {
  const isSameDay = moment(startAt).isSame(endAt, 'D');

  let currentDayCount, totalDayCount;
  if (!isSameDay) {
    const count = momentCounter({ startAt, ref_date });
    currentDayCount = count + 1;
    totalDayCount = momentCounter({ startAt, ref_date: endAt }) + 1;
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