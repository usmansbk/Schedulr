import moment from 'moment';

/**
 * Handle recurring events
 * @param event
 */
export default function repeat(event) {
  const {startAt, endAt} = event;

  let start = moment(startAt);
  let end = moment(endAt);
  let every = 'NEVER';
  let fromDay = moment();
  let finalDay;

  const rule = {
    every: (recurrence) => {
      every = recurrence;
      return rule;
    },
    from: (date) => {
      fromDay = moment(date);
      return rule;
    },
    until: (date) => {
      if (date) {
        finalDay = moment(date);
      }
      return rule;
    },
    next: () => {
      switch (every) {
        case 'DAILY':
        case 'WEEKDAYS':
          return fromDay;
        case 'WEEKLY':
          return fromDay.clone().isoWeekday(start.isoWeekday());
        case 'MONTHLY':
          return fromDay.clone().date(start.date());
        case 'YEARLY':
          return fromDay.clone().month(start.month()).date(start.date());
        default:
          return start;
      }
    },
    /**
     * DAILY and WEEKDAY event cannot span multiple days.
     * WEEKLY event must end before the next recurring event
     */
    matches: (dateInput) => {
      const date = moment(dateInput);
      if (
        fromDay.isBefore(start, 'day') ||
        date.isBefore(fromDay, 'day') ||
        (finalDay && date.isAfter(finalDay, 'day'))
      ) {
        return false;
      }

      const duration = end.diff(start, 'day');
      switch (every) {
        case 'DAILY':
          return true;
        case 'WEEKDAYS':
          return date.isoWeekday() < 6;
        case 'WEEKLY': {
          const startAt = fromDay.clone().isoWeekday(start.isoWeekday());
          const endAt = startAt.clone().add(duration, 'days');
          return date.isBetween(startAt, endAt, 'day', '[]');
        }
        case 'MONTHLY': {
          const startAt = fromDay.clone().date(start.date());
          const endAt = startAt.clone().add(duration, 'days');
          return date.isBetween(startAt, endAt, 'day', '[]');
        }
        case 'YEARLY': {
          const startAt = fromDay
            .clone()
            .month(start.month())
            .date(start.date());
          const endAt = startAt.clone().add(duration, 'days');
          return date.isBetween(startAt, endAt, 'day', '[]');
        }
        default:
          return date.isBetween(start, end, 'day', '[]');
      }
    },
  };

  return rule;
}
