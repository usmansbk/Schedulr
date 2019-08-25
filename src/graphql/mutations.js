/* eslint-disable */
 
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    email
    name
    pictureUrl
    avatar {
      key
      bucket
    }
    website
    createdAt
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
    }
    website
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
    forever
    isPublic
    isOwner
    isCancelled
    isBookmarked
    cancelledDates
    banner {
      bucket
      key
    }
    author {
      id
      name
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
    forever
    isPublic
    isCancelled
    cancelledDates
    banner {
      bucket
      key
    }
    updatedAt
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
      isCancelled
      isBookmarked
      cancelledDates
      banner {
        bucket
        key
      }
      author {
        id
        name
      }
      schedule {
        id
        name
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
    isPublic
    isOwner
    isFollowing
    status
    picture {
      key
      bucket
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
        cancelledDates
        banner {
          bucket
          key
        }
        author {
          id
          name
        }
        schedule {
          id
          name
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
    isPublic
    status
    updatedAt
    picture {
      key
      bucket
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
export const createFollow = `mutation CreateFollow($input: CreateFollowInput!) {
  createFollow(input: $input) {
    id
    schedule {
      id
      name
      description
      isPublic
      isOwner
      isFollowing
      status
      picture {
        key
        bucket
      }
      author {
        id
        name
        pictureUrl
        avatar {
          key
          bucket
        }
        website
        createdCount
        followingCount
      }
      events {
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
          isCancelled
          isBookmarked
          cancelledDates
          banner {
            bucket
            key
          }
          author {
            id
            name
          }
          schedule {
            id
            name
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
    to {
      id
      content
      author {
        id
        name
      }
    }
    author {
      id
      name
      pictureUrl
      avatar {
        key
        bucket
      }
    }
    event {
      id
      commentsCount
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
