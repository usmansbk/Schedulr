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
export const onUpdateSchedule = `subscription OnUpdateSchedule {
  onUpdateSchedule {
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
export const onDeleteSchedule = `subscription OnDeleteSchedule {
  onDeleteSchedule {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
