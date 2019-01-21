import gql from 'graphql-tag';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { getValue } from '../lib/formValidator';
import client from '../config/client';
import { getEvent, getBoard, Me } from '../graphql/queries';
import { BOARD_CLOSED, BOARD_OPEN } from '../lib/constants';

const __typename = 'Mutation';

export const createEventResponse = (input) => {
  const query = gql(getBoard);

  try {
    const { getBoard } = getBoardFromCache(query, input);
    const { me } = getCurrentUser();

    const newEvent = {
      __typename: 'Event',
      id: String(Math.random() * -1000),
      title: getValue(input.title),
      description: getValue(input.description),
      startAt: input.startAt,
      endAt: input.endAt,
      location: Boolean(input.location.address) ? {
        __typename: 'Location',
        ...input.location
      } : null,
      allDay: Boolean(input.allDay),
      repeat: input.repeat,
      eventType: input.eventType,
      isCancelled: false,
      board: {
        __typename: 'Board',
        id: getBoard.id,
        name: getBoard.name
      },
      cancelledDates: [],
      starsCount: 0,
      isStarred: false,
      isAuthor: true,
      author: me,
      commentsCount: 0,
      createdAt: moment().toISOString(),
      updatedAt: null
    };

    return ({
      __typename,
      createEvent: newEvent
    });
  } catch(error) {
    Toast.show(error.message, Toast.LONG);
  }
  return null;
};

export const createBoardResponse = (input) => {
  try {
    const { me } = getCurrentUser();

    const newBoard = {
      __typename: 'Board',
      id: String(Math.random() * -1000),
      name: getValue(input.name),
      description: getValue(input.description),
      status: getValue(input.status),
      isPublic: Boolean(input.isPublic),
      isFollowing: false,
      isAuthor: true,
      author: me,
      followersCount: 0,
      createdAt: moment().toISOString(),
      updatedAt: null
    };
    return ({
      __typename,
      createBoard: newBoard
    });
  } catch (error) {
    Toast.show(error.message, Toast.LONG);
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
    location: Boolean(input.location.address) ? {
      __typename: 'Location',
      ...input.location
    } : null
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
    const { getEvent } = getEventFromCache(query, input);
    const isCancelled =  input.option === 'ALL' ? true : false;
    const cancelledDates = new Set(getEvent.cancelledDates || []);
    const updatedAt = isCancelled ? moment().toISOString() : null;
    if (!isCancelled) {
      cancelledDates.add(input.date);
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
    Toast.show(error.message, Toast.LONG);
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

function getBoardFromCache(query, input) {
  return client.readQuery({
    query,
    variables: {
      id: input.boardId
    }
  });
}

function getEventFromCache(query, input) {
  return client.readQuery({
    query,
    variables: {
      id: input.id
    }
  });
}

function getCurrentUser() {
  return client.readQuery({
    query: gql(Me)
  });
}
