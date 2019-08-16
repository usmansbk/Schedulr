import memoize from 'lodash.memoize';
import emojiRegex from 'emoji-regex';

function sortList(list) {
  return list.sort((a, b) => {
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
}

export default sortSchedules = memoize((data) => {
  const closed = sortList(data.filter(a => a.status === 'CLOSED'));
  const opened = sortList(data.filter(a => a.status !== 'CLOSED'));

  return opened.concat(closed);
});

export const sortBy = (arr, key) => {
  return arr.sort((a, b) => {
    return a[key] - b[key];
  });
};

export const sortEvents = memoize((events, reverse) => {
  const sorted = events.sort((a, b) => {
    const reciprocal = reverse ? -1 : 1;
    return (a.startAt - b.startAt) * reciprocal;
  });
  return sorted;
});

export const sortBookmarks = memoize((events) => {
  const pending = events.filter(a => a.endAt > Date.now());
  const expired = events.filter(a => a.endAt < Date.now());
  const sorted = sortEvents(pending).concat(sortEvents(expired, true));
  return sorted;
});

export function eventsChanged(prev, next=[]) {
  if (prev.length !== next.length) return true;
  return !next.every((nextVal, index) => {
    const prevVal = prev[index];
    if (!prevVal) return false;
    const prevBanner = prevVal.banner || {};
    const nextBanner = nextVal.banner || {};
    const prevCancelledDates = prevVal.cancelledDates || [];
    const nextCancelledDates = nextVal.cancelledDates || [];
    return (prevVal.title === nextVal.title) &&
      (prevVal.startAt === nextVal.startAt) &&
      (prevVal.endAt === nextVal.endAt) &&
      (prevVal.category === nextVal.category) &&
      (prevVal.recurrence === nextVal.recurrence) &&
      (prevVal.until === nextVal.until) &&
      (prevVal.isCancelled === nextVal.isCancelled) &&
      (prevCancelledDates.length === nextCancelledDates.length) &&
      (prevVal.description === nextVal.description) &&
      (prevBanner.key === nextBanner.key)
  });
}

export function getInitials(name) {
  if (!name) return '🐱‍👤';
  const emojiMatch = emojiRegex().exec(name);
  let avatarName;
  if (emojiMatch) {
    avatarName = emojiMatch[0];
  } else {
    const [ first, second ] = name.split(' ');
    avatarName = `${first} ${second ? second : ''}`;
  }
  return avatarName;
}