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
      finalDay = moment(date);
      return rule;
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
          const endDay = fromDay
            .clone()
            .isoWeekday(start.isoWeekday())
            .add(duration, 'days');
          return date.isBetween(fromDay, endDay, 'day', '[]');
        }
        case 'MONTHLY': {
          const endDay = fromDay
            .clone()
            .date(start.date())
            .add(duration, 'days');
          return date.isBetween(fromDay, endDay, 'day', '[]');
        }
        case 'YEARLY': {
          const endDay = fromDay
            .clone()
            .month(start.month())
            .date(start.date())
            .add(duration, 'days');
          return date.isBetween(fromDay, endDay, 'day', '[]');
        }
        default:
          return date.isBetween(start, end, 'day', '[]');
      }
    },
  };

  return rule;
}
