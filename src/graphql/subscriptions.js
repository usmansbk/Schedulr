/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSchedule = `subscription OnCreateSchedule {
  onCreateSchedule {
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
export const onUpdateSchedule = `subscription OnUpdateSchedule {
  onUpdateSchedule {
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
export const onDeleteSchedule = `subscription OnDeleteSchedule {
  onDeleteSchedule {
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
export const onCreateComment = `subscription OnCreateComment {
  onCreateComment {
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
export const onUpdateComment = `subscription OnUpdateComment {
  onUpdateComment {
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
export const onDeleteComment = `subscription OnDeleteComment {
  onDeleteComment {
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
export const onCreateEvent = `subscription OnCreateEvent {
  onCreateEvent {
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
export const onUpdateEvent = `subscription OnUpdateEvent {
  onUpdateEvent {
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
export const onDeleteEvent = `subscription OnDeleteEvent {
  onDeleteEvent {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
