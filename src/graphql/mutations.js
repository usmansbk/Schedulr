/* eslint-disable */
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    me
    email
    name
    pictureUrl
    avatar {
      key
      bucket
      name
    }
    website
    bio
    followingCount
    createdCount
    createdAt
    updatedAt
    preference {
      id
      userId
      disablePush
      disableAdminComments
      disableReplies
      disableComments
      enableMembersComments
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    name
    pictureUrl
    avatar {
      key
      bucket
      name
    }
    website
    bio
    updatedAt
  }
}
`;
export const createState = `mutation CreateState($input: CreateAppStateInput!) {
  persistState(input: $input) {
    id
    allowedEvents
    mutedEvents
    mutedSchedules
    keysToRemove
    checkedList
  }
}`;
export const setState = `mutation SetState($input: UpdateAppStateInput!) {
  setState(input: $input) {
    id
    allowedEvents
    mutedEvents
    mutedSchedules
    keysToRemove
    checkedList
  }
}`;
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
    forever
    isPublic
    isOwner
    isBookmarked
    isOffline
    isCancelled
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
    forever
    isPublic
    isCancelled
    cancelledDates
    banner {
      bucket
      key
      name
    }
    updatedAt
  }
}
`;
export const updateEventWithAlbum = `mutation UpdateEvent($input: UpdateEventInput!) {
  updateEventWithAlbum: updateEvent(input: $input) {
    id
    album {
      key
      bucket
      region
      type
      size
      name
    }
  }
}
`;
export const deleteEvent = `mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
    id
    schedule {
      id
      eventsCount
    }
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
      forever
      isPublic
      isOwner
      isBookmarked
      isCancelled
      cancelledDates
      isOffline
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
  }
}
`;
export const deleteBookmark = `mutation DeleteBookmark($input: DeleteBookmarkInput!) {
  deleteBookmark(input: $input) {
    id
    event {
      id
      bookmarksCount
      isBookmarked
    }
  }
}
`;
export const createSchedule = `mutation CreateSchedule($input: CreateScheduleInput!) {
  createSchedule(input: $input) {
    id
    name
    description
    topic
    isPublic
    isOwner
    isFollowing
    isOffline
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
      createdCount
    }
    followersCount
    eventsCount
    createdAt
    updatedAt
    events @connection(key: "events") {
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
        isBookmarked
        isCancelled
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
  }
}
`;
export const updateSchedule = `mutation UpdateSchedule($input: UpdateScheduleInput!) {
  updateSchedule(input: $input) {
    id
    name
    description
    topic
    location
    isPublic
    status
    updatedAt
    picture {
      key
      bucket
      name
    }
  }
}
`;
export const deleteSchedule = `mutation DeleteSchedule($input: DeleteScheduleInput!) {
  deleteSchedule(input: $input) {
    id
    author {
      id
      createdCount
    }
  }
}
`;
export const createFollow = `mutation CreateFollow($input: CreateFollowInput!, $filter: ModelEventFilterInput) {
  createFollow(input: $input) {
    id
    schedule {
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
        bio
        me
        website
        createdCount
        followingCount
        createdAt
      }
      events(filter: $filter) @connection(key: "events") {
        nextToken
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
          isOffline
          isBookmarked
          isCancelled
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
      }
      followersCount
      eventsCount
      createdAt
      updatedAt
    }
  }
}
`;
export const deleteFollow = `mutation DeleteFollow($input: DeleteFollowInput!) {
  deleteFollow(input: $input) {
    id
    user {
      id
      followingCount
    }
    schedule {
      id
      followersCount
      isFollowing
    }
  }
}
`;
export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
    content
    isOwner
    isOffline
    attachment {
      key
      bucket
      name
      size
      type
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
    }
    event {
      id
      commentsCount
    }
    to {
      id
      content
      attachment {
        key
        bucket
        name
        type
      }
      author {
        id
        name
      }
    }
    createdAt
  }
}
`;
export const deleteComment = `mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    id
    event {
      id
      commentsCount
    }
  }
}
`;
export const createPreference = `mutation CreateUserPreference($input: CreateUserPreferenceInput!) {
  createUserPreference(input: $input) {
    id
    userId
    disablePush
    disableAdminComments
    disableReplies
    disableComments
    enableMembersComments
  }
}`;
export const updatePreference = `mutation UpdateUserPreference($input: UpdateUserPreferenceInput!) {
  updateUserPreference(input: $input) {
    id
    userId
    disablePush
    disableAdminComments
    disableReplies
    disableComments
    enableMembersComments
  }
}`;
