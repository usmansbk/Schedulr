/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSchedule = `query GetSchedule($id: ID!) {
  getSchedule(id: $id) {
    id
    name
    description
    status
    isPublic
    isFollowing
    isOwner
    owner {
      id
      name
      email
      pictureUrl
      followingCount
      createdCount
      comments {
        nextToken
      }
      events {
        nextToken
      }
      schedules {
        nextToken
      }
      following {
        nextToken
      }
    }
    eventsCount
    followersCount
    followers
    location {
      lat
      lon
    }
    events {
      items {
        id
        title
        description
        venue
        startAt
        endAt
        allDay
        isCancelled
        repeat
        until
        forever
        eventType
        isPublic
        cancelledDates
        bookmarksCount
        isBookmarked
        isOwner
        commentsCount
      }
      nextToken
    }
  }
}
`;
export const listSchedules = `query ListSchedules(
  $filter: ModelScheduleFilterInput
  $limit: Int
  $nextToken: String
) {
  listSchedules(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      status
      isPublic
      isFollowing
      isOwner
      owner {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      eventsCount
      followersCount
      followers
      location {
        lat
        lon
      }
      events {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) {
    id
    content
    isReply
    toComment {
      id
      content
      isReply
      toComment {
        id
        content
        isReply
        isOwner
      }
      isOwner
      event {
        id
        title
        description
        venue
        startAt
        endAt
        allDay
        isCancelled
        repeat
        until
        forever
        eventType
        isPublic
        cancelledDates
        bookmarksCount
        isBookmarked
        isOwner
        commentsCount
      }
      owner {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
    }
    isOwner
    event {
      id
      title
      description
      venue
      startAt
      endAt
      allDay
      isCancelled
      repeat
      until
      forever
      eventType
      location {
        lat
        lon
      }
      schedule {
        id
        name
        description
        status
        isPublic
        isFollowing
        isOwner
        eventsCount
        followersCount
        followers
      }
      isPublic
      cancelledDates
      bookmarksCount
      isBookmarked
      isOwner
      owner {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      commentsCount
      comments {
        nextToken
      }
    }
    owner {
      id
      name
      email
      pictureUrl
      followingCount
      createdCount
      comments {
        nextToken
      }
      events {
        nextToken
      }
      schedules {
        nextToken
      }
      following {
        nextToken
      }
    }
  }
}
`;
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      isReply
      toComment {
        id
        content
        isReply
        isOwner
      }
      isOwner
      event {
        id
        title
        description
        venue
        startAt
        endAt
        allDay
        isCancelled
        repeat
        until
        forever
        eventType
        isPublic
        cancelledDates
        bookmarksCount
        isBookmarked
        isOwner
        commentsCount
      }
      owner {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
    }
    nextToken
  }
}
`;
export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
    id
    title
    description
    venue
    startAt
    endAt
    allDay
    isCancelled
    repeat
    until
    forever
    eventType
    location {
      lat
      lon
    }
    schedule {
      id
      name
      description
      status
      isPublic
      isFollowing
      isOwner
      owner {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      eventsCount
      followersCount
      followers
      location {
        lat
        lon
      }
      events {
        nextToken
      }
    }
    isPublic
    cancelledDates
    bookmarksCount
    isBookmarked
    isOwner
    owner {
      id
      name
      email
      pictureUrl
      followingCount
      createdCount
      comments {
        nextToken
      }
      events {
        nextToken
      }
      schedules {
        nextToken
      }
      following {
        nextToken
      }
    }
    commentsCount
    comments {
      items {
        id
        content
        isReply
        isOwner
      }
      nextToken
    }
  }
}
`;
export const listEvents = `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      venue
      startAt
      endAt
      allDay
      isCancelled
      repeat
      until
      forever
      eventType
      location {
        lat
        lon
      }
      schedule {
        id
        name
        description
        status
        isPublic
        isFollowing
        isOwner
        eventsCount
        followersCount
        followers
      }
      isPublic
      cancelledDates
      bookmarksCount
      isBookmarked
      isOwner
      owner {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      commentsCount
      comments {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    email
    pictureUrl
    followingCount
    createdCount
    comments {
      items {
        id
        content
        isReply
        isOwner
      }
      nextToken
    }
    events {
      items {
        id
        title
        description
        venue
        startAt
        endAt
        allDay
        isCancelled
        repeat
        until
        forever
        eventType
        isPublic
        cancelledDates
        bookmarksCount
        isBookmarked
        isOwner
        commentsCount
      }
      nextToken
    }
    schedules {
      items {
        id
        name
        description
        status
        isPublic
        isFollowing
        isOwner
        eventsCount
        followersCount
        followers
      }
      nextToken
    }
    following {
      items {
        id
        name
        description
        status
        isPublic
        isFollowing
        isOwner
        eventsCount
        followersCount
        followers
      }
      nextToken
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      email
      pictureUrl
      followingCount
      createdCount
      comments {
        nextToken
      }
      events {
        nextToken
      }
      schedules {
        nextToken
      }
      following {
        nextToken
      }
    }
    nextToken
  }
}
`;
