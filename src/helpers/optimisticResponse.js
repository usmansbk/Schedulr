import gql from 'graphql-tag';
import moment from 'moment';
import shortid from 'shortid';
import { getValue } from 'lib/formValidator';
import client from '../config/client';
import {
  getEvent,
  getSchedule as getScheduleQuery,
  getComment,
  getUser as getUserQuery } from 'mygraphql/queries';
import { SCHEDULE_CLOSED, SCHEDULE_OPEN } from 'lib/constants';
import stores from 'stores';

const __typename = 'Mutation';

export const followScheduleResponse = (id) => {
  const boardData = getData(gql(getScheduleQuery), id);
  if (boardData) {
    const schedule = boardData.getSchedule;
    const count = schedule.followersCount;
    const isFollowing = schedule.isFollowing;
    
    return ({
      __typename,
      followSchedule: Object.assign({}, schedule, {
        isFollowing: true,
        followersCount: !isFollowing ? (count + 1) : count
      })
    });
  }
  return null;
};

export const unfollowScheduleResponse = (id) => {
  const boardData = getData(gql(getScheduleQuery), id);
  if (boardData) {
    const count = boardData.getSchedule.followersCount;
    const isFollowing = boardData.getSchedule.isFollowing;
  
    return ({
      __typename,
      unfollowSchedule: {
        __typename: 'Schedule',
        id,
        isFollowing: false,
        followersCount: (isFollowing && (count > 0)) ? count - 1 : count
      }
    });
  }
  return null;
};

export const deleteCommentResponse = (input) => {
  const data = getData(gql(getEvent), input.eventId);
  if (data) {
    const count = data.getEvent.commentsCount;
  
    const deleteComment = {
      __typename: 'Comment',
      id: input.id,
      event: {
        __typename: 'Event',
        id: input.eventId,
        commentsCount: count > 0 ? count - 1 : count
      }
    };
    return ({
      __typename,
      deleteComment
    });
  }
  return null;
};

export const deleteEventResponse = (input) => {
  const data = getData(gql(getEvent), input.id);
  if (data) {
    const event = data.getEvent;
    let schedule = null;
    if (event.schedule) {
      const boardData = getData(gql(getScheduleQuery), event.schedule.id);
      schedule = boardData.getSchedule;
      const eventsCount = schedule.eventsCount;
      schedule = {
        __typename: 'Schedule',
        id: schedule.id,
        eventsCount: eventsCount > 0 ? eventsCount - 1 : eventsCount
      }
    }
    return ({
      __typename,
      deleteEvent: {
        __typename: 'Event',
        id: input.id,
        schedule
      }
    }); 
  }
  return null;
};

export const createCommentResponse = (input, eventId) => {
  const eventData = getData(gql(getEvent), eventId);
  const userData = getData(gql(getUserQuery), stores.me.id);
  if (eventData && userData) {
    const toCommentData = input.toCommentId && getData(gql(getComment), input.toCommentId);
    const toComment = toCommentData ? toCommentData.getComment : null;
    const { getUser } = userData;
    const author = {
      __typename: 'User',
      id: getUser.id,
      name: getUser.name,
      picture: getUser.picture
    };
    const newComment = {
      __typename: 'Comment',
      id: '-' + shortid.generate(),
      content: input.content,
      isReply: Boolean(input.toCommentId),
      isAuthor: true,
      toComment,
      event: {
        __typename: 'Event',
        id: eventId,
        commentsCount: eventData.getEvent.commentsCount + 1,
      },
      author,
      createdAt: moment().toISOString()
    };
    return ({
      __typename,
      createComment: newComment
    });
  }
  return null;
}

export const createEventResponse = (input) => {
  let schedule = null;
  if (input.scheduleId) {
    const query = gql(getScheduleQuery);
    const data = getData(query, input.scheduleId);
    const { getSchedule } = data;
    schedule = {
      __typename: 'Schedule',
      id: getSchedule.id,
      name: getSchedule.name,
      eventsCount: getSchedule.eventsCount + 1,
      isFollowing: false,
      isPublic: Boolean(getSchedule.isPublic)
    };
  }
  
  const { getUser } = getData(gql(getUserQuery), stores.me.id);
  const newEvent = {
    __typename: 'Event',
    id: '-' + shortid.generate(),
    title: getValue(input.title),
    description: getValue(input.description),
    startAt: input.startAt,
    endAt: input.endAt,
    venue: getValue(input.venue),
    allDay: Boolean(input.allDay),
    repeat: input.repeat,
    forever: Boolean(input.forever),
    until: getValue(input.until),
    eventType: getValue(input.eventType),
    isCancelled: false,
    isPublic: Boolean(input.isPublic),
    schedule,
    author: {
      __typename: 'User',
      id: getUser.id,
      name: getUser.name
    },
    cancelledDates: [],
    bookmarksCount: 0,
    isBookmarked: false,
    isAuthor: true,
    commentsCount: 0,
    createdAt: moment().valueOf(),
    updatedAt: null
  };

  return ({
    __typename,
    createEvent: newEvent
  });
};

export const createScheduleResponse = (input) => {
    const data = getData(gql(getUserQuery), stores.me.id);
    if (data) {
      const { getUser } = data;
      const newSchedule = {
        __typename: 'Schedule',
        id: '-' + shortid.generate(),
        name: getValue(input.name),
        description: getValue(input.description),
        status: getValue(input.status),
        isPublic: Boolean(input.isPublic),
        isFollowing: false,
        isAuthor: true,
        author: getUser,
        eventsCount: 0,
        followersCount: 0,
        createdAt: moment().toISOString(),
        updatedAt: null
      };
      return ({
        __typename,
        createSchedule: newSchedule
      });
    }
  return null;
};

export const updateEventResponse = (input) => {
  const query = gql(getScheduleQuery);
  let schedule;
  try {
    const { getSchedule } = getData(query, input.scheduleId);
    schedule = {
      __typename: 'Schedule',
      id: getSchedule.id,
      name: getSchedule.name,
      eventsCount: getSchedule.eventsCount + 1,
      isFollowing: false
    };
  } catch (error) {
    schedule = null;
  }
  const inputCopy = {...input};
  delete inputCopy.scheduleId;
  return ({
    __typename,
    updateEvent: Object.assign({}, inputCopy, {
      __typename: 'Event',
      title: getValue(input.title),
      description: getValue(input.description),
      updatedAt: moment().valueOf(),
      venue: getValue(input.venue),
      schedule
    })
  });
}

export const updateScheduleResponse = (input) => ({
  __typename,
  updateSchedule: Object.assign({}, input, {
    __typename: 'Schedule',
    name: getValue(input.name),
    description: getValue(input.description),
    isPublic: Boolean(input.isPublic),
    updatedAt: moment().toISOString()
  })
});

export const cancelEventResponse = (input) => {
  const query = gql(getEvent);
  const data = getData(query, input.id);
  if (data) {
    const { getEvent } = data;
    const isCancelled =  input.option === 'ALL' ? true : false;
    const cancelledDates = getEvent.cancelledDates || [];
    const updatedAt = isCancelled ? moment().valueOf() : null;
    if (!isCancelled) {
      cancelledDates.push(input.date);
    }
    return ({
      __typename,
      cancelEvent: {
        __typename: 'Event',
        id: input.id,
        isCancelled,
        cancelledDates,
        updatedAt
      }
    });
  }
  return null;
};

export const closeScheduleResponse = (input) => ({
  __typename,
  closeSchedule: Object.assign({}, input, {
    __typename: 'Schedule',
    status: SCHEDULE_CLOSED,
    updatedAt: moment().toISOString()
  })
});

export const openScheduleResponse = (input) => ({
  __typename,
  openSchedule: Object.assign({}, input, {
    __typename: 'Schedule',
    status: SCHEDULE_OPEN,
    updatedAt: moment().toISOString()
  })
});

export const toggleBookmarkButton = (input, prev, action) => {
  const { bookmarksCount, isBookmarked } = prev;
  let newCount = bookmarksCount;

  if ((bookmarksCount > 0) && (action === 'unbookmarkEvent')) newCount--;
  else if (action === 'bookmarkEvent') newCount++;

  return ({
    __typename,
    [action] : {
      __typename: 'Event',
      id: input.id,
      isBookmarked: !isBookmarked,
      bookmarksCount: newCount
    }
  });
}

function getData(query, id) {
  return client.readQuery({
    query,
    variables: {
      id
    }
  });
}
