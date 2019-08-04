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
import { BOARD_CLOSED, BOARD_OPEN } from 'lib/constants';
import stores from 'stores';

const __typename = 'Mutation';

export const followScheduleResponse = (id) => {
  const boardData = getData(gql(getScheduleQuery), id);
  if (boardData) {
    const board = boardData.getSchedule;
    const count = board.followersCount;
    const isFollowing = board.isFollowing;
    
    return ({
      __typename,
      followSchedule: Object.assign({}, board, {
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
    let board = null;
    if (event.board) {
      const boardData = getData(gql(getScheduleQuery), event.board.id);
      board = boardData.getSchedule;
      const eventsCount = board.eventsCount;
      board = {
        __typename: 'Schedule',
        id: board.id,
        eventsCount: eventsCount > 0 ? eventsCount - 1 : eventsCount
      }
    }
    return ({
      __typename,
      deleteEvent: {
        __typename: 'Event',
        id: input.id,
        board
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
  let board = null;
  if (input.boardId) {
    const query = gql(getScheduleQuery);
    const data = getData(query, input.boardId);
    const { getSchedule } = data;
    board = {
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
    board,
    author: {
      __typename: 'User',
      id: getUser.id,
      name: getUser.name
    },
    cancelledDates: [],
    starsCount: 0,
    isStarred: false,
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
  let board;
  try {
    const { getSchedule } = getData(query, input.boardId);
    board = {
      __typename: 'Schedule',
      id: getSchedule.id,
      name: getSchedule.name,
      eventsCount: getSchedule.eventsCount + 1,
      isFollowing: false
    };
  } catch (error) {
    board = null;
  }
  const inputCopy = {...input};
  delete inputCopy.boardId;
  return ({
    __typename,
    updateEvent: Object.assign({}, inputCopy, {
      __typename: 'Event',
      title: getValue(input.title),
      description: getValue(input.description),
      updatedAt: moment().valueOf(),
      venue: getValue(input.venue),
      board
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
    status: BOARD_CLOSED,
    updatedAt: moment().toISOString()
  })
});

export const openScheduleResponse = (input) => ({
  __typename,
  openSchedule: Object.assign({}, input, {
    __typename: 'Schedule',
    status: BOARD_OPEN,
    updatedAt: moment().toISOString()
  })
});

export const toggleStarButton = (input, prev, action) => {
  const { starsCount, isStarred } = prev;
  let newCount = starsCount;

  if ((starsCount > 0) && (action === 'unstarEvent')) newCount--;
  else if (action === 'starEvent') newCount++;

  return ({
    __typename,
    [action] : {
      __typename: 'Event',
      id: input.id,
      isStarred: !isStarred,
      starsCount: newCount
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
