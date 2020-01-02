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

export const isEventValid = (event) => {
  const { isCancelled, startAt, endAt } = event;
  const cancelledDates = event.cancelledDates || [];
  return moment().twix(endAt).isCurrent() && !isEventCancelled({ cancelledDates, startAt, isCancelled });
};

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
    caption = I18n.get("EVENT_CAPTION_allDay")({ type: category, recurrence });
  } else {
    if (currentDayCount) {
      caption = I18n.get("EVENT_CAPTION_xthDayOfType")({ currentDayCount, totalDayCount, type: category });
    } else {
      caption = I18n.get("EVENT_CAPTION_xDurationRecurrenceType")({ duration, recurrence, type: category });
    }
  }
  let formatted = capitalize(caption.trim());
  return formatted;
};