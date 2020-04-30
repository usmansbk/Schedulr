import gql from 'graphql-tag';
import moment from 'moment';
import stores from "stores";
import client from 'config/client';
import {
  ADD,
  DELETE,
  EVENT_TYPE,
  SCHEDULE_TYPE,
  BOOKMARK_TYPE,
  COMMENT_TYPE,
  FOLLOW_TYPE
} from 'lib/constants';
import { getScheduleEvents, getEventComments } from 'api/queries';
import { deleteBookmark as deleteBookmarkQuery } from 'api/mutations';
import logger from 'config/logger';

const __typename = 'Mutation';

const eventConnection = {
  items: [],
  nextToken: null,
  __typename: "ModelEventConnection"
};

const commentConnection = {
  items: [],
  nextToken: null,
  __typename: "ModelCommentConnection"
};

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
      return createFollow(input, typename);
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
      return deleteFollow(input, typename);
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
  // ================= Update schedule events count =======================
  
  const scheduleFragment = gql`fragment createEventSchedule on Schedule {
    id
    name
    eventsCount
    isFollowing
  }`;
  const fragmentId = `Schedule:${input.eventScheduleId}`;
  const schedule = client.readFragment({
    fragment: scheduleFragment,
    id: fragmentId
  });
  let updatedSchedule = null;
  if (schedule) {
    const count = schedule.eventsCount;
    if (typeof count === 'number') {
      schedule.eventsCount = count + 1;
    } else {
      schedule.eventsCount = 1;
    }
    client.writeFragment({
      fragment: scheduleFragment,
      id: fragmentId,
      data: schedule
    });
    updatedSchedule = {
      __typename: SCHEDULE_TYPE,
      id: schedule.id,
      name: schedule.name,
      isFollowing: false
    };
  }
  // ======================================================================

  // ============================ Create comments =================================
  try {
    client.writeQuery({
      query: gql(getEventComments),
      variables: {
        id: input.id
      },
      data: {
        getEventComments: {
          __typename: EVENT_TYPE,
          id: input.id,
          isOwner: true,
          schedule: {
            __typename: SCHEDULE_TYPE,
            id: input.eventScheduleId
          },
          comments: commentConnection
        }
      }
    });
  } catch(error) {
    logger.logError(error);
  }
  // ==============================================================================
  const createdAt = moment().toISOString();

  const event = {
    __typename: typename,
    ...input,
    isCancelled: null,
    isOwner: true,
    isBookmarked: false,
    isOffline: true,
    cancelledDates: null,
    banner: null,
    author,
    schedule: updatedSchedule,
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
  const createdAt = moment().toISOString();
  // ================== Create schedule events optimistic query =================
  try {
    client.writeQuery({
      query: gql(getScheduleEvents),
      variables: {
        id: input.id
      },
      data: {
        getScheduleEvents: {
          __typename: SCHEDULE_TYPE,
          id: input.id,
          isFollowing: false,
          isOwner: true,
          isPublic: !!input.isPublic,
          events: eventConnection
        }
      }
    });
  } catch(error) {
    logger.logError(error);
  }
  // =========================================================================

  const schedule  = {
    __typename: typename,
    ...input,
    isOwner: true,
    isFollowing: false,
    isOffline: true,
    status: null,
    picture: null,
    author,
    followersCount: 0,
    eventsCount: 0,
    createdAt,
    updatedAt: createdAt,
    events: eventConnection,
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
        name
      }
    }`,
    id: `User:${stores.appState.userId}`
  });

  let attachment = null;
  if (input.attachment) {
    attachment = input.attachment.map(file => {
      return Object.assign({}, file, {
        __typename: 'S3Object'
      });
    });
  }
  
  const comment = {
    id: input.id,
    content: input.content,
    attachment,
    isOwner: true,
    isOffline: true,
    isReply: Boolean(input.commentToId),
    repliesCount: 0,
    author,
    createdAt: moment().toISOString(),
    __typename: typename
  };
  return comment;
}

function createBookmark(input, typename) {
  const event = client.readFragment({
    fragment: gql`fragment bookmarkEventDetails on Event {
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
      forever
      isPublic
      isOwner
      isCancelled
      isBookmarked
      cancelledDates
      banner {
        bucket
        key
        name
      }
      author {
        id
        name
      }
      schedule {
        id
        name
        isFollowing
      }
      commentsCount
      bookmarksCount
      createdAt
      updatedAt
    }`,
    id: `Event:${input.bookmarkEventId}`
  });
  const count = event.bookmarksCount;
  if (!event.isBookmarked && (typeof count === 'number')) {
    event.bookmarksCount = count + 1;
  } else {
    event.bookmarksCount = 1;
  }
  event.isBookmarked = true;
  const bookmark = {
    __typename: typename,
    id: input.id,
    event,
  };
  return bookmark;
}

function createFollow(input, typename) {
  const schedule = client.readFragment({
    fragment: gql`fragment followScheduleDetails on Schedule {
      id
      name
      description
      topic
      isPublic
      isOwner
      isFollowing
      location
      status
      picture {
        key
        bucket
        name
      }
      author {
        id
        name
        pictureUrl
        avatar {
          key
          bucket
          name
        }
        me
        website
        bio
        createdCount
        followingCount
        createdAt
      }
      followersCount
      eventsCount
      createdAt
      updatedAt
    }`,
    id: `Schedule:${input.followScheduleId}`
  });
  // Check and read preloaded schedule events
  
  let scheduleEventsConnection = eventConnection;

  try {
    const scheduleEvents = client.readFragment({
      fragment: gql`fragment followingScheduleEvents on Schedule {
        id
        events {
          items {
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
            forever
            isPublic
            isOwner
            isCancelled
            isBookmarked
            isOffline
            cancelledDates
            banner {
              bucket
              key
              name
            }
            author {
              id
              name
            }
            schedule {
              id
              name
              isFollowing
            }
            commentsCount
            bookmarksCount
            createdAt
            updatedAt
          }
          nextToken
        }
      }`,
      id: `Schedule:${input.followScheduleId}`
    });
  
    // Update event items schedule isFollowing field to true
    if (scheduleEvents) {
      const { events: { items } } = scheduleEvents;
      scheduleEvents.events.items = items.map(event => {
        if (!event.schedule) return event;
        return Object.assign({}, event, {
          schedule: Object.assign({}, event.schedule, {
            isFollowing: true
          })
        });
      });
      scheduleEventsConnection = scheduleEvents.events;
    }
  } catch(error) {
    logger.logError(error);
  }
  // ********************************************************  
  if (schedule) {
    if (!schedule.isFollowing) {
      if (typeof schedule.followersCount === 'number') {
        schedule.followersCount += 1;
      } else {
        schedule.followersCount = 1;
      }
    }
    const optimisticSchedule = Object.assign({}, schedule, {
      isFollowing: true,
      events: scheduleEventsConnection
    });
    //=========== Update user following count ======================
    const userId = stores.appState.userId;
    const userFragment = gql`fragment currentUser on User {
      id
      followingCount
    }`;
    const currentUser = client.readFragment({
      fragment: userFragment,
      id: `User:${userId}`
    });
    if (currentUser) {
      if (typeof currentUser.followingCount === 'number') {
        currentUser.followingCount += 1;
      } else {
        currentUser.followingCount = 1;
      }
    }
    client.writeFragment({
      fragment: userFragment,
      id: `User:${userId}`,
      data: currentUser
    });
    // ==============================================================

    const follow = {
      __typename: typename,
      id: input.id,
      schedule: optimisticSchedule
    };
    return follow;
  }
  return null;
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
      author {
        id
      }
    }`,
    id: `${typename}:${input.id}`
  });
  const schedule = event.schedule;
  if (schedule) {
    const count = schedule.eventsCount;
    if ((typeof count === 'number') && count > 0) {
      schedule.eventsCount = count - 1;
    }
  }
  
  // ******************* Remove from bookmarks *******************

  const bookmark = client.readFragment({
    fragment: gql`fragment deleteEventBookmark on Bookmark {
      id
    }`,
    id: `${BOOKMARK_TYPE}:${event.author.id}-${event.id}`
  });
  if (bookmark) {
    const deleteInput = {
      id: bookmark.id
    };
    client.mutate({
      mutation: gql(deleteBookmarkQuery),
      variables: {
        input: deleteInput
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteBookmark: deleteBookmark(deleteInput, BOOKMARK_TYPE)
      }
    }).catch(logger.logError);
  }
  // ************************************************************

  return event;
}

function deleteComment(input, typename) {
  const event = client.readFragment({
    fragment: gql`fragment deleteCommentEvent on Event {
      id
      commentsCount
    }`,
    id: `${EVENT_TYPE}:${input.eventId}`
  });
  if (event) {
    const count = event.commentsCount;
    if (typeof count === 'number' && count > 0) {
      event.commentsCount = count - 1;
    }
  }
  const comment = Object.assign({}, {
    __typename: typename,
    id: input.id,
    event
  });
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
    const count = event.bookmarksCount;
    if (event.isBookmarked && (typeof count === 'number' && count > 0)) {
      event.bookmarksCount = count - 1;
    }
    event.isBookmarked = null;
  }
  const bookmark = {
    __typename: typename,
    id: input.id,
    event
  };
  return bookmark;
}

function deleteFollow(input, typename) {
  const schedule = client.readFragment({
    fragment: gql`fragment followScheduleDeleteDetails on Schedule {
      id
      followersCount
      isFollowing
    }`,
    id: `Schedule:${input.followScheduleId}`
  });
  if (schedule) {
    const count = schedule.followersCount;
    if (schedule.isFollowing && (typeof count === 'number' && count > 0)) {
      schedule.followersCount = count - 1;
    }
    schedule.isFollowing = null;
  }
  const user = client.readFragment({
    fragment: gql`fragment followUserDetails on User {
      id
      followingCount
    }`,
    id: `User:${stores.appState.userId}`
  });
  const { followingCount } = user
  if (typeof followingCount === 'number' && followingCount > 0) {
    user.followingCount -= 1;
  }
  const deletedFollow = {
    id: input.id,
    user,
    schedule,
    __typename: typename
  };
  return deletedFollow;
}

// ********************* UPDATES **********************

function updateSchedule(input, typename) {
  const schedule = client.readFragment({
    fragment: gql`fragment updateScheduleDetails on Schedule {
      id
      name
      description
      isPublic
      topic
      status
      location
      updatedAt
      picture {
        key
        bucket
        name
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
      forever
      isPublic
      isCancelled
      cancelledDates
      banner {
        key
        bucket
        name
      }
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