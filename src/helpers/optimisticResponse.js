import gql from 'graphql-tag';
import moment from 'moment';
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
  if (!body) return null;
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
      break;
    case SCHEDULE_TYPE:
      return createSchedule(input, typename);
      break;
    case COMMENT_TYPE:
      // return buildCreateComment(input, typename);
      break;
    case BOOKMARK_TYPE:
      // return buildCreateBookmark(input, typename);
      break;
    case FOLLOW_TYPE:
      // return buildCreateFollow(input, typename);
      break;
    default:
      return null;
      break;
  }
}

function buildDeleteResponse(input, typename) {
  switch (typename) {
    case EVENT_TYPE:
      return deleteEvent(input, typename);
      break;
    case SCHEDULE_TYPE:
      return deleteSchedule(input, typename);
      break;
    case COMMENT_TYPE:
      // return buildDeleteComment(input, typename);
      break;
    case BOOKMARK_TYPE:
      // return buildDeleteBookmark(input, typename);
      break;
    case FOLLOW_TYPE:
      // return buildDeleteFollow(input, typename);
      break;
    default:
      return null;
      break;
  }
}

function buildUpdateResponse(input, typename) {
  switch (typename) {
    case EVENT_TYPE:
      return updateEvent(input, typename);
      break;
    case SCHEDULE_TYPE:
      return updateSchedule(input, typename);
      break;
    default:
      return null;
      break;
  }
}

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

// Create Comment
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   createComment: {
          //     id: "f22b82f1-bd08-400b-b930-06adabf2d5b1",
          //     content: "God bless",
          //     isOwner: true,
          //     to: null,
          //     author: {
          //       id: "usmansbk@gmail.com",
          //       name: "Usman Suleiman Babakolo",
          //       pictureUrl:null,
          //       avatar: {
          //         key: "profile_image/usmansbk@gmail.com10219539.jpeg",
          //         bucket: "schdlre4a77eacabcb468f9af1f2063df20dd7-dev",
          //         __typename:"S3Object"
          //       },
          //       __typename: "User"
          //     },
          //     event: {
          //       id: "f3564d7f-dd1b-5000-8d63-2b207ce87580-2ced63e3-b636-4a8e-b2c6-651dad1932ad",
          //       commentsCount: 1,
          //       __typename: "Event"
          //     },
          //     createdAt: "2019-08-17T10:50:01.389Z",
          //     __typename: "Comment"
          //   }
          // }
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

// Delete comment
          // optimisticResponse: {
          //  __typename: 'Mutation',
          //  deleteComment: {
          //     id: "b21b5828-4abf-46b1-badf-06c667c44005",
          //     event: {
          //       id: "f3564d7f-dd1b-5000-8d63-2b207ce87580-fdedd8e6-efef-4f3e-bd83-c9d9da0a834d",
          //       commentsCount: 1,
          //       __typename: "Event"
          //     },
          //     __typename: "Comment"
          //   }
          // }