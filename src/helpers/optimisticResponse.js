import gql from 'graphql-tag';
import moment from 'moment';
import shortid from 'shortid';
import SimpleToast from 'react-native-simple-toast';
import { getValue } from 'lib/formValidator';
import client from '../config/client';
import {
  getEvent,
  getBoard as getBoardQuery,
  getComment,
  getUser as getUserQuery } from 'mygraphql/queries';
import { BOARD_CLOSED, BOARD_OPEN } from 'lib/constants';
import stores from 'stores';

const __typename = 'Mutation';

export const followBoardResponse = (id) => {
  const boardNode = getNode(gql(getBoardQuery), id);
  const board = boardNode.getBoard;
  const count = board.followersCount;
  const isFollowing = board.isFollowing;
  
  return ({
    __typename,
    followBoard: Object.assign({}, board, {
      isFollowing: true,
      followersCount: !isFollowing ? (count + 1) : count
    })
  })
};

export const unfollowBoardResponse = (id) => {
  const boardNode = getNode(gql(getBoardQuery), id);
  const count = boardNode.getBoard.followersCount;
  const isFollowing = boardNode.getBoard.isFollowing;

  return ({
    __typename,
    unfollowBoard: {
      __typename: 'Board',
      id,
      isFollowing: false,
      followersCount: (isFollowing && (count > 0)) ? count - 1 : count
    }
  })
};

export const deleteCommentResponse = (input) => {
  const data = getNode(gql(getEvent), input.eventId);
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
};

export const deleteEventResponse = (input) => {
  const data = getNode(gql(getEvent), input.id);
  const event = data.getEvent;
  const boardData = getNode(gql(getBoardQuery), event.board.id);
  const board = boardData.getBoard;
  const eventsCount = board.eventsCount;
  return ({
    __typename,
    deleteEvent: {
      __typename: 'Event',
      id: input.id,
      board: {
        __typename: 'Board',
        id: board.id,
        eventsCount: eventsCount > 0 ? eventsCount - 1 : eventsCount
      }
    }
  });
};

export const createCommentResponse = (input, eventId) => {
  const me = stores.me.asJs();
  
  const eventNode = getNode(gql(getEvent), eventId);
  const toCommentNode = input.toCommentId ? getNode(gql(getComment), input.toCommentId) : null;
  const toComment = toCommentNode && toCommentNode.getComment;
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
      commentsCount: eventNode.getEvent.commentsCount + 1,
    },
    author: {
      __typename: 'User',
      id: me.id,
      name: me.name,
      pictureUrl: me.pictureUrl
    },
    createdAt: moment().toISOString()
  };
  return ({
    __typename,
    createComment: newComment
  });
}

export const createEventResponse = (input) => {
  const query = gql(getBoardQuery);

  try {
    const { getBoard } = getNode(query, input.boardId);
    let venue = null;
    if (input.venue && input.venue.address ) {
      venue = {
        __typename: 'Venue',
        address: input.venue.address
      }
    }

    const newEvent = {
      __typename: 'Event',
      id: '-' + shortid.generate(),
      title: getValue(input.title),
      description: getValue(input.description),
      startAt: input.startAt,
      endAt: input.endAt,
      venue,
      allDay: Boolean(input.allDay),
      repeat: input.repeat,
      forever: Boolean(input.forever),
      until: input.until,
      eventType: input.eventType,
      isCancelled: false,
      board: {
        __typename: 'Board',
        id: getBoard.id,
        name: getBoard.name,
        eventsCount: getBoard.eventsCount + 1,
        isFollowing: false
      },
      cancelledDates: [],
      starsCount: 0,
      isStarred: false,
      isAuthor: true,
      commentsCount: 0,
      createdAt: moment().toISOString(),
      updatedAt: null
    };

    return ({
      __typename,
      createEvent: newEvent
    });
  } catch(error) {
    SimpleToast.show(error.message, SimpleToast.LONG);
  }
  return null;
};

export const createBoardResponse = (input) => {
  try {
    const { getUser } = getNode(gql(getUserQuery), stores.me.id);

    const newBoard = {
      __typename: 'Board',
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
      createBoard: newBoard
    });
  } catch (error) {
    SimpleToast.show(error.message, SimpleToast.LONG);
  }
  return null;
};

export const updateEventResponse = (input) => ({
  __typename,
  updateEvent: Object.assign({}, input, {
    __typename: 'Event',
    title: getValue(input.title),
    description: getValue(input.description),
    updatedAt: moment().toISOString(),
    venue: {
      __typename: 'Venue',
      address: Boolean(input.venue && input.venue.address) ? input.venue.address : '',
    }
  })
});

export const updateBoardResponse = (input) => ({
  __typename,
  updateBoard: Object.assign({}, input, {
    __typename: 'Board',
    name: getValue(input.name),
    description: getValue(input.description),
    isPublic: Boolean(input.isPublic),
    updatedAt: moment().toISOString()
  })
});

export const cancelEventResponse = (input) => {
  const query = gql(getEvent);
  try {
    const { getEvent } = getNode(query, input.id);
    const isCancelled =  input.option === 'ALL' ? true : false;
    const cancelledDates = getEvent.cancelledDates || [];
    const updatedAt = isCancelled ? moment().toISOString() : null;
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
  } catch (error) {
    SimpleToast.show(error.message, SimpleToast.LONG);
  }
  return null;
};

export const closeBoardResponse = (input) => ({
  __typename,
  closeBoard: Object.assign({}, input, {
    __typename: 'Board',
    status: BOARD_CLOSED,
    updatedAt: moment().toISOString()
  })
});

export const openBoardResponse = (input) => ({
  __typename,
  openBoard: Object.assign({}, input, {
    __typename: 'Board',
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

function getNode(query, id) {
  return client.readQuery({
    query,
    variables: {
      id
    }
  });
}
