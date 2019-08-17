import gql from 'graphql-tag';
import moment from 'moment';
import uuid from 'uuid/v4';
import stores from "stores";
import client from 'config/client';

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
  if (operationType === 'ADD') {
    return buildCreateResponse(input, typename);
  } else {
    if (operationType === 'DELETE') {
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
      // return buildCreateBookmark(input, typename);
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
      // return buildDeleteBookmark(input, typename);
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
    status: null,
    picture: null,
    author,
    followersCount: 0,
    eventsCount: 0,
    createdAt,
    updatedAt: createdAt,
    events,
  };
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

// Create bookmark
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   createBookmark: {
          //     "id": "usmansbk@gmail.com-f3564d7f-dd1b-5000-8d63-2b207ce87580-fdedd8e6-efef-4f3e-bd83-c9d9da0a834d",
          //     "event": {
          //       "id": "f3564d7f-dd1b-5000-8d63-2b207ce87580-fdedd8e6-efef-4f3e-bd83-c9d9da0a834d",
          //       "title": "Mongolia you",
          //       "description": null,
          //       "venue": null,
          //       "category": null,
          //       "startAt": 1566041520000,
          //       "endAt": 1566048720000,
          //       "allDay": false,
          //       "recurrence": "NEVER",
          //       "until": null,
          //       "isPublic": false,
          //       "isOwner": true,
          //       "isCancelled": null,
          //       "cancelledDates": null,
          //       "banner": null,
          //       "author": {
          //         "id": "usmansbk@gmail.com",
          //         "name": "Usman Suleiman Babakolo",
          //         "__typename": "User"
          //       },
          //       "schedule": {
          //         "id": "f3564d7f-dd1b-5000-8d63-2b207ce87580-6209eb54-646b-4a38-803b-16b3da427216",
          //         "name": "Mix well I think",
          //         "__typename": "Schedule"
          //       },
          //       "commentsCount": 2,
          //       "bookmarksCount": 1,
          //       "createdAt": "2019-08-17T11:04:03.208Z",
          //       "updatedAt": "2019-08-17T11:29:25.344Z",
          //       "__typename": "Event"
          //     },
          //     "__typename": "Bookmark"
          //   }
          // }

// Delete bookmark
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   deleteBookmark: {
          //     "id": "usmansbk@gmail.com-f3564d7f-dd1b-5000-8d63-2b207ce87580-fdedd8e6-efef-4f3e-bd83-c9d9da0a834d",
          //     "event": {
          //       "id": "f3564d7f-dd1b-5000-8d63-2b207ce87580-fdedd8e6-efef-4f3e-bd83-c9d9da0a834d",
          //       "bookmarksCount": 0,
          //       "__typename": "Event"
          //     },
          //     "__typename": "Bookmark"
          //   }
          // }