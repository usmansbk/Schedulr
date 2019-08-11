/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = `subscription OnCreateEvent {
  onCreateEvent {
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
    author {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    schedule {
      id
      name
      description
      isPublic
      isOwner
      status
      events {
        nextToken
      }
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      followers {
        nextToken
      }
      followersCount
      eventsCount
      createdAt
      updatedAt
    }
    comments {
      items {
        id
        content
        isOwner
        createdAt
        updatedAt
      }
      nextToken
    }
    bookmarks {
      items {
        id
        createdAt
      }
      nextToken
    }
    commentsCount
    bookmarksCount
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
    category
    startAt
    endAt
    allDay
    recurrence
    until
    isPublic
    isOwner
    author {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    schedule {
      id
      name
      description
      isPublic
      isOwner
      status
      events {
        nextToken
      }
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      followers {
        nextToken
      }
      followersCount
      eventsCount
      createdAt
      updatedAt
    }
    comments {
      items {
        id
        content
        isOwner
        createdAt
        updatedAt
      }
      nextToken
    }
    bookmarks {
      items {
        id
        createdAt
      }
      nextToken
    }
    commentsCount
    bookmarksCount
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
    category
    startAt
    endAt
    allDay
    recurrence
    until
    isPublic
    isOwner
    author {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    schedule {
      id
      name
      description
      isPublic
      isOwner
      status
      events {
        nextToken
      }
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      followers {
        nextToken
      }
      followersCount
      eventsCount
      createdAt
      updatedAt
    }
    comments {
      items {
        id
        content
        isOwner
        createdAt
        updatedAt
      }
      nextToken
    }
    bookmarks {
      items {
        id
        createdAt
      }
      nextToken
    }
    commentsCount
    bookmarksCount
    createdAt
    updatedAt
  }
}
`;
export const onCreateBookmark = `subscription OnCreateBookmark {
  onCreateBookmark {
    id
    event {
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
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      schedule {
        id
        name
        description
        isPublic
        isOwner
        status
        followersCount
        eventsCount
        createdAt
        updatedAt
      }
      comments {
        nextToken
      }
      bookmarks {
        nextToken
      }
      commentsCount
      bookmarksCount
      createdAt
      updatedAt
    }
    user {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    createdAt
  }
}
`;
export const onUpdateBookmark = `subscription OnUpdateBookmark {
  onUpdateBookmark {
    id
    event {
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
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      schedule {
        id
        name
        description
        isPublic
        isOwner
        status
        followersCount
        eventsCount
        createdAt
        updatedAt
      }
      comments {
        nextToken
      }
      bookmarks {
        nextToken
      }
      commentsCount
      bookmarksCount
      createdAt
      updatedAt
    }
    user {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    createdAt
  }
}
`;
export const onDeleteBookmark = `subscription OnDeleteBookmark {
  onDeleteBookmark {
    id
    event {
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
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      schedule {
        id
        name
        description
        isPublic
        isOwner
        status
        followersCount
        eventsCount
        createdAt
        updatedAt
      }
      comments {
        nextToken
      }
      bookmarks {
        nextToken
      }
      commentsCount
      bookmarksCount
      createdAt
      updatedAt
    }
    user {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    createdAt
  }
}
`;
export const onCreateSchedule = `subscription OnCreateSchedule {
  onCreateSchedule {
    id
    name
    description
    isPublic
    isOwner
    status
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
        isPublic
        isOwner
        commentsCount
        bookmarksCount
        createdAt
        updatedAt
      }
      nextToken
    }
    author {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    followers {
      items {
        id
        createdAt
      }
      nextToken
    }
    followersCount
    eventsCount
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
    isPublic
    isOwner
    status
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
        isPublic
        isOwner
        commentsCount
        bookmarksCount
        createdAt
        updatedAt
      }
      nextToken
    }
    author {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    followers {
      items {
        id
        createdAt
      }
      nextToken
    }
    followersCount
    eventsCount
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
    isPublic
    isOwner
    status
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
        isPublic
        isOwner
        commentsCount
        bookmarksCount
        createdAt
        updatedAt
      }
      nextToken
    }
    author {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    followers {
      items {
        id
        createdAt
      }
      nextToken
    }
    followersCount
    eventsCount
    createdAt
    updatedAt
  }
}
`;
export const onCreateFollow = `subscription OnCreateFollow {
  onCreateFollow {
    id
    user {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    schedule {
      id
      name
      description
      isPublic
      isOwner
      status
      events {
        nextToken
      }
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      followers {
        nextToken
      }
      followersCount
      eventsCount
      createdAt
      updatedAt
    }
    createdAt
  }
}
`;
export const onUpdateFollow = `subscription OnUpdateFollow {
  onUpdateFollow {
    id
    user {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    schedule {
      id
      name
      description
      isPublic
      isOwner
      status
      events {
        nextToken
      }
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      followers {
        nextToken
      }
      followersCount
      eventsCount
      createdAt
      updatedAt
    }
    createdAt
  }
}
`;
export const onDeleteFollow = `subscription OnDeleteFollow {
  onDeleteFollow {
    id
    user {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    schedule {
      id
      name
      description
      isPublic
      isOwner
      status
      events {
        nextToken
      }
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      followers {
        nextToken
      }
      followersCount
      eventsCount
      createdAt
      updatedAt
    }
    createdAt
  }
}
`;
export const onCreateComment = `subscription OnCreateComment {
  onCreateComment {
    id
    content
    to {
      id
      content
      to {
        id
        content
        isOwner
        createdAt
        updatedAt
      }
      replies {
        nextToken
      }
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      isOwner
      event {
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
        commentsCount
        bookmarksCount
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    replies {
      items {
        id
        content
        isOwner
        createdAt
        updatedAt
      }
      nextToken
    }
    author {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    isOwner
    event {
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
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      schedule {
        id
        name
        description
        isPublic
        isOwner
        status
        followersCount
        eventsCount
        createdAt
        updatedAt
      }
      comments {
        nextToken
      }
      bookmarks {
        nextToken
      }
      commentsCount
      bookmarksCount
      createdAt
      updatedAt
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
    to {
      id
      content
      to {
        id
        content
        isOwner
        createdAt
        updatedAt
      }
      replies {
        nextToken
      }
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      isOwner
      event {
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
        commentsCount
        bookmarksCount
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    replies {
      items {
        id
        content
        isOwner
        createdAt
        updatedAt
      }
      nextToken
    }
    author {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    isOwner
    event {
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
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      schedule {
        id
        name
        description
        isPublic
        isOwner
        status
        followersCount
        eventsCount
        createdAt
        updatedAt
      }
      comments {
        nextToken
      }
      bookmarks {
        nextToken
      }
      commentsCount
      bookmarksCount
      createdAt
      updatedAt
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
    to {
      id
      content
      to {
        id
        content
        isOwner
        createdAt
        updatedAt
      }
      replies {
        nextToken
      }
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      isOwner
      event {
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
        commentsCount
        bookmarksCount
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    replies {
      items {
        id
        content
        isOwner
        createdAt
        updatedAt
      }
      nextToken
    }
    author {
      id
      email
      name
      pictureUrl
      website
      created {
        nextToken
      }
      following {
        nextToken
      }
      bookmarks {
        nextToken
      }
      me
      followingCount
      createdCount
      createdAt
      updatedAt
    }
    isOwner
    event {
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
      author {
        id
        email
        name
        pictureUrl
        website
        me
        followingCount
        createdCount
        createdAt
        updatedAt
      }
      schedule {
        id
        name
        description
        isPublic
        isOwner
        status
        followersCount
        eventsCount
        createdAt
        updatedAt
      }
      comments {
        nextToken
      }
      bookmarks {
        nextToken
      }
      commentsCount
      bookmarksCount
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`;
