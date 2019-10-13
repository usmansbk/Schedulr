import memoize from 'lodash.memoize';
import emojiRegex from 'emoji-regex';
import moment from 'moment';
import { processEvents } from 'lib/calendr';
import { SCHEDULE_CLOSED } from 'lib/constants';

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

export const sortSchedules = memoize((data) => {
  const closed = sortList(data.filter(a => a.status === SCHEDULE_CLOSED));
  const opened = sortList(data.filter(a => a.status !== SCHEDULE_CLOSED));

  return opened.concat(closed);
});

export const sortBy = (arr, key) => {
  return arr.sort((a, b) => {
    return moment(a[key]) - moment(b[key]);
  });
};

export const sortEvents = memoize((events, reverse) => {
  const sorted = events.sort((a, b) => moment(a.startAt) - moment(b.startAt));
  if (reverse) return sorted.reverse();
  return sorted;
});

export const sortBookmarks = memoize((data) => {
  const events = data.filter(item => typeof item !== 'string');
  const deleted = data.filter(item => typeof item === 'string');
  const pending = events.filter(a => moment(a.endAt) > moment());
  const expired = events.filter(a => moment(a.endAt) < moment());
  const sorted = sortEvents(pending).concat(sortEvents(expired, true).concat(deleted));
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
      (prevVal.isBookmarked === nextVal.isBookmarked) &&
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

export function mergeEvents(data) {
  let allEvents = [];

  if (!data) return allEvents;

  const { created, following, bookmarks } = data;
  
  if (created) {
    // extract events from created schedules
    created.items.forEach(schedule => {
      allEvents = allEvents.concat(schedule.events.items);
    });
  }

  if (following) {
    // extract events from following schedules
    following.items.forEach(follow => {
      const { schedule } = follow;
      if (schedule) {
        // remove bookmarks to prevent duplicates
        const events = schedule.events.items.filter(item => !item.isBookmarked);
        allEvents = allEvents.concat(events);
      }
    });
  }

  if (bookmarks) {
    // extract events from bookmarks
    bookmarks.items.forEach(bookmark => {
      const { event } = bookmark;
      if (event && !event.isOwner) { // don't duplicate events from created schedules
        allEvents.push(event);
      }
    });
  }
  return allEvents;
}

export function mergeSchedules(data) {
  let allSchedules = [];
  
  if (!data) return allSchedules;

  const { created, following } = data;

  // extract created schedules
  if (created) {
    allSchedules = allSchedules.concat(created.items);
  }

  // extract following schedules
  if (following) {
    const followingSchedules = following.items.map(follow => follow.schedule).filter(schedule => Boolean(schedule));
    allSchedules = allSchedules.concat(followingSchedules);
  }
  return allSchedules;
}

export function filterEvents(events, query) {
  return sortBookmarks(processEvents(events.filter(
    item => item.title.toLowerCase().includes(query.toLowerCase()) ||
     (item.category && item.category.toLowerCase().includes(query.toLowerCase())))));
}

export function filterSchedules(schedules, query) {
  return sortSchedules(schedules.filter(
    item => item.name.toLowerCase().includes(query.toLowerCase())
  ));
}

export function capitalize(string) {
  if (!string) return '';
  const firstLetter = string[0].toUpperCase();
  return firstLetter + string.substring(1);
}

export function decapitalize(string, all=false) {
  if (!string) return '';
  const first = string[0]
  const head = all ? first.toLowerCase() : first.toUpperCase();
  const tail = string.substring(1).toLowerCase();
  return head + tail;
}

export function singularMomentUnit(unit) {
  if (!unit) return unit;
  const isPlural = unit.slice(-1) === 's';
  if (!isPlural) return unit;
  return unit.slice(0, -1);
}

export function ellipsisMode(str) {
  let trimmed = str;
  if (str && (str.length >= 23)) {
    trimmed = str.slice(0, 23) + '...';
  }
  return trimmed;
}