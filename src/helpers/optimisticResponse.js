import gql from 'graphql-tag';
import moment from 'moment';
import uuid from 'uuid/v4';
import stores from "stores";
import client from 'config/client';
import { ADD, DELETE } from 'lib/constants';

const __typename = 'Mutation';
const EVENT_TYPE = 'Event';
const SCHEDULE_TYPE = 'Schedule';
const BOOKMARK_TYPE = 'Bookmark';
const COMMENT_TYPE = 'Comment';
const FOLLOW_TYPE = 'Follow';

export default function buildOptimisticResponse({
  input,
  mutationName,
  responseType,
  operationType
}) {
  const body = buildResponseBody(input, responseType, operationType);
  return {
    __typename,
    [mutationName] : {
      __typename: responseType,
      ...body
    }
  }
}

function buildResponseBody(input, typename, operationType) {
  if (operationType === ADD) {
    return buildCreateResponse(input, typename);
  } else {
    if (operationType === DELETE) {
      return buildDeleteResponse(input, typename);
    } else {
      return buildUpdateResponse(input, typename);
    }
  }
}

function buildCreateResponse(input, typename) {
  switch (typename) {
    case EVENT_TYPE:
      return createEvent(input, typename);
    case SCHEDULE_TYPE:
      return createSchedule(input, typename);
    case COMMENT_TYPE:
      return createComment(input, typename);
    case BOOKMARK_TYPE:
      return createBookmark(input, typename);
    case FOLLOW_TYPE:
      // return buildCreateFollow(input, typename);
    default:
      return null;
  }
}

function buildDeleteResponse(input, typename) {
  switch (typename) {
    case EVENT_TYPE:
      return deleteEvent(input, typename);
    case SCHEDULE_TYPE:
      return deleteSchedule(input, typename);
    case COMMENT_TYPE:
      return deleteComment(input, typename);
    case BOOKMARK_TYPE:
      return deleteBookmark(input, typename);
    case FOLLOW_TYPE:
      // return buildDeleteFollow(input, typename);
    default:
      return null;
  }
}

function buildUpdateResponse(input, typename) {
  switch (typename) {
    case EVENT_TYPE:
      return updateEvent(input, typename);
    case SCHEDULE_TYPE:
      return updateSchedule(input, typename);
    default:
      return null;
  }
}

// *************************** CREATE *******************************

function createEvent(input, typename) {
  const author = client.readFragment({
    fragment: gql`fragment createEventAuthor on User {
      id
      name
    }`,
    id: `User:${stores.appState.userId}`
  });
  const schedule = client.readFragment({
    fragment: gql`fragment createEventSchedule on Schedule {
      id
      name
      eventsCount
    }`,
    id: `Schedule:${input.eventScheduleId}`
  });
  const count = schedule.eventsCount;
  if (typeof count === 'number') {
    schedule.eventsCount = count + 1;
  } else {
    schedule.eventsCount = 1;
  }
  const createdAt = moment().toISOString();

  const event = {
    __typename: typename,
    ...input,
    isCancelled: null,
    isOwner: true,
    isBookmarked: false,
    cancelledDates: null,
    banner: null,
    author,
    schedule,
    bookmarksCount: 0,
    commentsCount: 0,
    createdAt,
    updatedAt: createdAt,
  };
  delete event.eventScheduleId;
  delete event.location;
  return event;
}

function createSchedule(input, typename) {
  const author = client.readFragment({
    fragment: gql`fragment createScheduleAuthor on User {
      id
      name
      createdCount
    }`,
    id: `User:${stores.appState.userId}`
  });
  const count = author.createdCount;
  if (typeof count === 'number') {
    author.createdCount = count + 1;
  } else {
    author.createdCount = 1;
  }
  const events = {
    items: [],
    nextToken: null,
    __typename: "ModelEventConnection"
  };
  const createdAt = moment().toISOString();

  const schedule  = {
    __typename: typename,
    ...input,
    isOwner: true,
    isFollowing: false,
    status: null,
    picture: null,
    author,
    followersCount: 0,
    eventsCount: 0,
    createdAt,
    updatedAt: createdAt,
    events,
  };
  delete schedule.location;
  return schedule;
}

function createComment(input, typename) {
  const author = client.readFragment({
    fragment: gql`fragment createCommentAuthor on User {
      id
      name
      pictureUrl
      avatar {
        key
        bucket
      }
    }`,
    id: `User:${stores.appState.userId}`
  });
  const event = client.readFragment({
    fragment: gql`fragment createCommentEvent on Event {
      id
      commentsCount
    }`,
    id: `Event:${input.commentEventId}`
  });
  let to = null;
  if (input.commentToId) {
    to = client.readFragment({
      fragment: gql`fragment toComment on Comment {    
        id
        content
        author {
          id
          name
        }
      }`,
      id: `${typename}:${input.commentToId}`
    });
  }

  const count = event.commentsCount;
  if (typeof count === 'number') {
    event.commentsCount = count + 1;
  } else {
    event.commentsCount = 1;
  }
  
  const comment = {
    id: '-' + uuid(),
    content: input.content,
    isOwner: true,
    to,
    author,
    event,
    createdAt: moment().toISOString(),
    __typename: typename
  };
  return comment;
}

function createBookmark(input, typename) {
  const event = client.readFragment({
    fragment: gql`fragment bookmarkEvent on Event {
      id
      title
      description
      venue
      category
      startAt
      endAt
      allDay
      recurrence
      until
      isPublic
      isOwner
      isCancelled
      isBookmarked
      cancelledDates
      banner {
        bucket
        key
      }
      author {
        id
        name
      }
      schedule {
        id
        name
      }
      commentsCount
      bookmarksCount
      createdAt
      updatedAt
    }`,
    id: `Event:${input.bookmarkEventId}`
  });
  event.isBookmarked = true;
  const count = event.bookmarksCount;
  if (typeof count === 'number') {
    event.bookmarksCount = count + 1;
  } else {
    event.bookmarksCount = 1;
  }
  const bookmark = {
    __typename: typename,
    id: input.id,
    event,
  };
  return bookmark;
}

// ********************** DELETE *******************************

function deleteSchedule(input, typename) {
  const schedule = client.readFragment({
    fragment: gql`fragment deleteScheduleDetails on Schedule {
      id
      author {
        id
        createdCount
      }
    }`,
    id: `${typename}:${input.id}`
  });
  const count = schedule.author.createdCount;
  if (typeof count === 'number' && count > 0) {
    schedule.author.createdCount = count - 1;
  }
  return schedule;
}

function deleteEvent(input, typename) {
  const event = client.readFragment({
    fragment: gql`fragment deleteEventDetails on Event {
      id
      schedule {
        id
        eventsCount
      }
    }`,
    id: `${typename}:${input.id}`
  });
  const count = event.schedule.eventsCount;
  if ((typeof count === 'number') && count > 0) {
    event.schedule.eventsCount = count - 1;
  }
  return event;
}

function deleteComment(input, typename) {
  const comment = client.readFragment({
    fragment: gql`fragment deleteCommentDetails on Comment {
      id
      event {
        id
        commentsCount
      }
    }`,
    id: `${typename}:${input.id}`
  });
  const count = comment.event.commentsCount;
  if (typeof count === 'number' && count > 0) {
    comment.event.commentsCount = count - 1;
  }
  return comment;
}

function deleteBookmark(input, typename) {
  const event = client.readFragment({
    fragment: gql`fragment deleteBookmarkEvent on Event {
      id
      isBookmarked
      bookmarksCount
    }`,
    id: `Event:${input.bookmarkEventId}`
  });

  if (event) {
    event.isBookmarked = null;
    const count = event.bookmarksCount;
    if (typeof count === 'number' && count > 0) {
      event.bookmarksCount = count - 1;
    }
  }
  return {
    __typename: typename,
    id: input.id,
    event
  };
}

// ********************* UPDATES **********************

function updateSchedule(input, typename) {
  const schedule = client.readFragment({
    fragment: gql`fragment updateScheduleDetails on Schedule {
      id
      name
      description
      isPublic
      status
      updatedAt
      picture {
        key
        bucket
      }
    }`,
    id: `${typename}:${input.id}`
  });
  const updatedSchedule = Object.assign({}, schedule, input, {
    updatedAt: moment().toISOString()
  });
  return updatedSchedule;
}

function updateEvent(input, typename) {
  const event = client.readFragment({
    fragment: gql`fragment updateEventDetails on Event {
      id
      title
      description
      venue
      category
      startAt
      endAt
      allDay
      recurrence
      until
      isPublic
      isOwner
      isCancelled
      cancelledDates
      banner {
        key
        bucket
      }
      commentsCount
      bookmarksCount
      updatedAt
    }`,
    id: `${typename}:${input.id}`
  });
  const updatedEvent = Object.assign({}, event, input, {
    updatedAt: moment().toISOString()
  });
  delete updatedEvent.eventScheduleId;
  return updatedEvent;
}