import moment from 'moment';
import shortid from 'shortid';
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

export const sortSchedules = (data) => {
  const closed = sortList(data.filter(a => a.status === SCHEDULE_CLOSED));
  const opened = sortList(data.filter(a => a.status !== SCHEDULE_CLOSED));

  return opened.concat(closed);
};

export const sortEvents = (events, reverse) => {
  const sorted = events.sort((a, b) => moment(a.startAt) - moment(b.startAt));
  if (reverse) return sorted.reverse();
  return sorted;
};

export const sortBookmarks = (data) => {
  const events = data.filter(item => typeof item !== 'string');
  const deleted = data.filter(item => typeof item === 'string');
  const pending = events.filter(a => moment(a.endAt) > moment());
  const expired = events.filter(a => moment(a.endAt) < moment());
  const sorted = sortEvents(pending).concat(sortEvents(expired, true).concat(deleted));
  return sorted;
};

export function eventsChanged(prev, next=[]) {
  if (prev === next) return false;
  if (prev.length !== next.length) return true;

  return next.some((nextVal, index) => {
    const prevVal = prev[index];
    return (nextVal.updatedAt !== prevVal.updatedAt) ||
      (nextVal.isBookmarked !== prevVal.isBookmarked);
  });
}

export function mergeEvents(data, calendarEvents=[]) {

  let allEvents = calendarEvents;

  if (!data) return allEvents;

  const { created, following, bookmarks } = data;
  
  if (created && created.items) {
    // extract events from created schedules
    created.items.forEach(schedule => {
      allEvents = allEvents.concat(schedule.events.items);
    });
  }

  if (following && following.items) {
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

  if (bookmarks && bookmarks.items) {
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
  if (created && created.items) {
    allSchedules = allSchedules.concat(created.items);
  }

  // extract following schedules
  if (following && following.items) {
    const followingSchedules = following.items.map(follow => follow.schedule).filter(schedule => Boolean(schedule));
    allSchedules = allSchedules.concat(followingSchedules);
  }
  return allSchedules;
}

export function filterPrivate(schedules) {
  return schedules.filter(schdl => schdl.isPublic || schdl.isFollowing || schdl.isOwner);
}

export function filterEvents(events, query) {
  return sortBookmarks(events.filter(
    item => item.title.toLowerCase().includes(query.toLowerCase()) ||
     (item.category && item.category.toLowerCase().includes(query.toLowerCase()))));
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

export function ellipsisMode(str) {
  let trimmed = str;
  if (str && (str.length >= 21)) {
    trimmed = str.slice(0, 21) + '...';
  }
  return trimmed;
}

export function getFilePrefix(type) {
  const t = type.toLowerCase();
  if (t.includes('image')) {
    return 'IMG';
  } else if (t.includes('video')) {
    return 'VID';
  } else if (t.includes('audio')) {
    return 'AUD';
  } else if (t.includes('text')) {
    return 'TXT';
  } else if (t.includes('zip') || (t.includes('compressed') || t.includes('archive'))) {
    return 'ZIP';
  } else {
    return 'DOC';
  }
} 

function getFileExtension(type) {
  const separatorIndex = type.toLowerCase().lastIndexOf('/');
  const ext = type.slice(separatorIndex + 1);
  return ext;
}
 
export function getFileName(type, withExtension) {
  const m = moment();
  const year = m.format('YYYY');
  const month = m.format('MM');
  const day = m.format('D');
  const dateTag = `${year}${month}${day}`;
  name = `${getFilePrefix(type)}-${dateTag}-${shortid.generate()}`;
  if (withExtension) {
    const ext = getFileExtension(type);
    name = `${name}.${ext}`;
  }
  return name;
}