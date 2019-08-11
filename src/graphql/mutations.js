/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateBookmarksCount = `mutation UpdateBookmarksCount($input: UpdateCountInput!) {
  updateBookmarksCount(input: $input) {
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
export const updateCommentsCount = `mutation UpdateCommentsCount($input: UpdateCountInput!) {
  updateCommentsCount(input: $input) {
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
export const updateEventsCount = `mutation UpdateEventsCount($input: UpdateCountInput!) {
  updateEventsCount(input: $input) {
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
export const updateFollowingCount = `mutation UpdateFollowingCount($input: UpdateCountInput!) {
  updateFollowingCount(input: $input) {
    id
    email
    name
    pictureUrl
    website
    created {
      items {
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
      nextToken
    }
    following {
      items {
        id
        createdAt
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
    me
    followingCount
    createdCount
    createdAt
    updatedAt
  }
}
`;
export const updateCreatedCount = `mutation UpdateCreatedCount($input: UpdateCountInput!) {
  updateCreatedCount(input: $input) {
    id
    email
    name
    pictureUrl
    website
    created {
      items {
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
      nextToken
    }
    following {
      items {
        id
        createdAt
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
    me
    followingCount
    createdCount
    createdAt
    updatedAt
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    email
    name
    pictureUrl
    website
    created {
      items {
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
      nextToken
    }
    following {
      items {
        id
        createdAt
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
    me
    followingCount
    createdCount
    createdAt
    updatedAt
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    email
    name
    pictureUrl
    website
    created {
      items {
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
      nextToken
    }
    following {
      items {
        id
        createdAt
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
    me
    followingCount
    createdCount
    createdAt
    updatedAt
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    email
    name
    pictureUrl
    website
    created {
      items {
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
      nextToken
    }
    following {
      items {
        id
        createdAt
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
    me
    followingCount
    createdCount
    createdAt
    updatedAt
  }
}
`;
export const createEvent = `mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
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
      name
      me
    }
    schedule {
      id
      name
      eventsCount
    }
    commentsCount
    bookmarksCount
    createdAt
    updatedAt
  }
}
`;
export const updateEvent = `mutation UpdateEvent($input: UpdateEventInput!) {
  updateEvent(input: $input) {
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
export const deleteEvent = `mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
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
export const createBookmark = `mutation CreateBookmark($input: CreateBookmarkInput!) {
  createBookmark(input: $input) {
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
export const updateBookmark = `mutation UpdateBookmark($input: UpdateBookmarkInput!) {
  updateBookmark(input: $input) {
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
export const deleteBookmark = `mutation DeleteBookmark($input: DeleteBookmarkInput!) {
  deleteBookmark(input: $input) {
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
export const createSchedule = `mutation CreateSchedule($input: CreateScheduleInput!) {
  createSchedule(input: $input) {
    id
    name
    description
    isPublic
    isOwner
    status
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
    followersCount
    eventsCount
    createdAt
    updatedAt
  }
}
`;
export const updateSchedule = `mutation UpdateSchedule($input: UpdateScheduleInput!) {
  updateSchedule(input: $input) {
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
export const deleteSchedule = `mutation DeleteSchedule($input: DeleteScheduleInput!) {
  deleteSchedule(input: $input) {
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
export const createFollow = `mutation CreateFollow($input: CreateFollowInput!) {
  createFollow(input: $input) {
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
export const updateFollow = `mutation UpdateFollow($input: UpdateFollowInput!) {
  updateFollow(input: $input) {
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
export const deleteFollow = `mutation DeleteFollow($input: DeleteFollowInput!) {
  deleteFollow(input: $input) {
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
export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
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
export const updateComment = `mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
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
export const deleteComment = `mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
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
