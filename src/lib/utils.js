import differenceWith from 'lodash.differencewith';
import memoize from 'lodash.memoize';

export default sortBoards = memoize((data) => {
  const sorted = data.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return sorted;
});

export const sortBy = (arr, key) => {
  return arr.sort((a, b) => {
    return Date.parse(a[key]) - Date.parse(b[key]);
  })
};

export const sortEvents = memoize((events, reverse) => {
  const sorted = events.sort((a, b) => {
    const reciprocal = reverse ? -1 : 1;
    return (Date.parse(a.startAt) - Date.parse(b.startAt)) * reciprocal;
  });
  return sorted;
});

export const sortStarredEvents = memoize((events) => {
  const pending = events.filter((a, b) => Date.parse(a.endAt) > Date.now());
  const expired = events.filter((a, b) => Date.parse(a.endAt) < Date.now());
  const sorted = sortEvents(pending).concat(sortEvents(expired, true));
  return sorted;
});

export function eventsDiff(prev, next) {
  return differenceWith(prev, next, (prevVal, nextVal) => {
    const prevCancelledDates = prevVal.cancelledDates || [];
    const nextCancelledDates = nextVal.cancelledDates || [];
    return (prevVal.title === nextVal.title) &&
      (prevVal.startAt === nextVal.startAt) &&
      (prevVal.endAt === nextVal.endAt) &&
      (prevVal.eventType === nextVal.eventType) &&
      (prevVal.repeat === nextVal.repeat) &&
      (prevVal.until === nextVal.until) &&
      (prevVal.isCancelled === nextVal.isCancelled) &&
      (prevCancelledDates.length === nextCancelledDates.length) &&
      (prevVal.isStarred === nextVal.isStarred) &&
      (prevVal.id === nextVal.id);
  });
}