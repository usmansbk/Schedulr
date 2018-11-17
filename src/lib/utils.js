import shortid from 'shortid';
import moment from 'moment';

export default createNewGroup = (group, author) => {
  const newGroup = {
    __typename: 'Group',
    id: shortid.generate(),
    name: group.name.trim(),
    description: group.description.trim(),
    url: group.url.trim(),
    pictureUrl: null,
    membersCount: 1,
    status: 'OPEN',
    privacy: group.privacy,
    isPrivate: group.privacy === 'PRIVATE',
    isMember: true,
    isClosed: false,
    isAuthor: true,
    author,
    createdAt: moment().toISOString(),
    updatedAt: moment().toISOString(),
  };
  return newGroup;
}

export const createNewEvent = (event, author, group) => {
  const newEvent = {
    __typename: 'Event',
    id: shortid.generate(),
    name: event.name.trim(),
    eventType: event.eventType,
    description: event.description.trim(),
    location: event.location.trim(),
    start: event.start,
    end: event.end,
    repeat: event.repeat,
    author,
    group,
    isAuthor: true,
    isCancelled: false,
    isMember: true,
    isStarred: false,
    commentsCount: 0,
    calendarId: null,
    createdAt: moment().toISOString(),
    updatedAt: moment().toISOString(),
  };
  return newEvent;
}