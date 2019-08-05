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
    isAuthor
    author {
      id
      name
      email
      pictureUrl
      followingCount
      createdCount
      createdSchedules {
        id
        name
        description
        status
        isPublic
        isFollowing
        isAuthor
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
      followingSchedules {
        id
        name
        description
        status
        isPublic
        isFollowing
        isAuthor
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
    }
    eventsCount
    followersCount
    followers {
      id
      name
      email
      pictureUrl
      followingCount
      createdCount
      createdSchedules {
        id
        name
        description
        status
        isPublic
        isFollowing
        isAuthor
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
      followingSchedules {
        id
        name
        description
        status
        isPublic
        isFollowing
        isAuthor
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
    }
    events {
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
      schedule {
        id
        name
        description
        status
        isPublic
        isFollowing
        isAuthor
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
      isPublic
      cancelledDates
      bookmarksCount
      isBookmarked
      isAuthor
      author {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      commentsCount
      comments {
        id
        content
        isReply
        isAuthor
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
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
      isAuthor
      author {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      eventsCount
      followersCount
      followers {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      events {
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
        isAuthor
        commentsCount
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        isAuthor
        createdAt
        updatedAt
      }
      isAuthor
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
        isAuthor
        commentsCount
        createdAt
        updatedAt
      }
      author {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      createdAt
      updatedAt
    }
    isAuthor
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
      schedule {
        id
        name
        description
        status
        isPublic
        isFollowing
        isAuthor
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
      isPublic
      cancelledDates
      bookmarksCount
      isBookmarked
      isAuthor
      author {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      commentsCount
      comments {
        id
        content
        isReply
        isAuthor
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    author {
      id
      name
      email
      pictureUrl
      followingCount
      createdCount
      createdSchedules {
        id
        name
        description
        status
        isPublic
        isFollowing
        isAuthor
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
      followingSchedules {
        id
        name
        description
        status
        isPublic
        isFollowing
        isAuthor
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
    }
    createdAt
    updatedAt
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
        isAuthor
        createdAt
        updatedAt
      }
      isAuthor
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
        isAuthor
        commentsCount
        createdAt
        updatedAt
      }
      author {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      createdAt
      updatedAt
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
    schedule {
      id
      name
      description
      status
      isPublic
      isFollowing
      isAuthor
      author {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      eventsCount
      followersCount
      followers {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      events {
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
        isAuthor
        commentsCount
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    isPublic
    cancelledDates
    bookmarksCount
    isBookmarked
    isAuthor
    author {
      id
      name
      email
      pictureUrl
      followingCount
      createdCount
      createdSchedules {
        id
        name
        description
        status
        isPublic
        isFollowing
        isAuthor
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
      followingSchedules {
        id
        name
        description
        status
        isPublic
        isFollowing
        isAuthor
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
    }
    commentsCount
    comments {
      id
      content
      isReply
      toComment {
        id
        content
        isReply
        isAuthor
        createdAt
        updatedAt
      }
      isAuthor
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
        isAuthor
        commentsCount
        createdAt
        updatedAt
      }
      author {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
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
      schedule {
        id
        name
        description
        status
        isPublic
        isFollowing
        isAuthor
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
      isPublic
      cancelledDates
      bookmarksCount
      isBookmarked
      isAuthor
      author {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      commentsCount
      comments {
        id
        content
        isReply
        isAuthor
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
    createdSchedules {
      id
      name
      description
      status
      isPublic
      isFollowing
      isAuthor
      author {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      eventsCount
      followersCount
      followers {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      events {
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
        isAuthor
        commentsCount
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    followingSchedules {
      id
      name
      description
      status
      isPublic
      isFollowing
      isAuthor
      author {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      eventsCount
      followersCount
      followers {
        id
        name
        email
        pictureUrl
        followingCount
        createdCount
      }
      events {
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
        isAuthor
        commentsCount
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
      createdSchedules {
        id
        name
        description
        status
        isPublic
        isFollowing
        isAuthor
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
      followingSchedules {
        id
        name
        description
        status
        isPublic
        isFollowing
        isAuthor
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
    }
    nextToken
  }
}
`;
