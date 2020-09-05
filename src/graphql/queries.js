/* eslint-disable */
export const me = `query {
  me {
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

export const state = `query GetAppState($id: ID!) {
  state(id: $id) {
    id
    allowedEvents
    mutedEvents
    mutedSchedules
    keysToRemove
    checkedList
  }
}`;

export const myPref = `query GetPreference($id: ID!) {
  userPref(id: $id) {
    id
    userId
    disablePush
    disableAdminComments
    disableReplies
    disableComments
    enableMembersComments
  }
}`;

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    me
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
  }
}
`;
export const getAlbum = `query GetAlbum($id: ID!) {
  getAlbum: getEvent(id: $id) {
    id
    isOwner
    album {
      key
      bucket
      region
      type
      size
      name
    }
  }
}`;
export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
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
    isOffline
    isOwner
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
  }
}
`;
export const getCommentThread = `query GetCommentThread($id: ID!, $limit: Int, $nextToken: String) {
  getCommentThread: getComment(id: $id) {
    id
    content
    isOwner
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
    schedule {
      id
    }
    createdAt
    thread(sortDirection: DESC, limit: $limit, nextToken: $nextToken) @connection(key: "thread") {
      items {
        id
        content
        isOwner
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
        createdAt
      }
      nextToken
    }
  }
}`;
export const getEventComments = `query GetEventComments($id: ID!, $limit: Int, $nextToken: String, $filter: ModelCommentFilterInput) {
  getEventComments: getEvent(id: $id) {
    id
    isOwner
    schedule {
      id
    }
    commentsCount
    comments(sortDirection: DESC, limit: $limit, nextToken: $nextToken, filter: $filter) @connection(key: "comments") {
      items {
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
      nextToken
    }
  }
}`;
export const getSchedule = `query GetSchedule($id: ID!) {
  getSchedule(id: $id) {
    id
    name
    description
    topic
    isPublic
    isOwner
    isFollowing
    location
    status
    author {
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
      me
      createdCount
      followingCount
      createdAt
    }
    picture {
      key
      bucket
      name
    }
    followersCount
    eventsCount
    createdAt
    updatedAt
  }
}
`;
export const getScheduleEvents = `query GetScheduleWithEvents($id: ID!, $limit: Int, $filter: ModelEventFilterInput, $nextToken: String) {
  getScheduleEvents: getSchedule(id: $id) {
    id
    isFollowing
    isOwner
    isPublic
    events(filter: $filter, nextToken: $nextToken, limit: $limit, sortDirection: ASC) @connection(key: "events") {
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
export const getUserBookmarks = `query GetBookmarks($nextToken: String, $limit: Int) {
  getUserBookmarks: me {
    id
    bookmarks(nextToken: $nextToken, limit: $limit, sortDirection: DESC) @connection(key: "bookmarks") {
      items {
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
      nextToken
    }
  }
}`;
export const getUserSchedules = `query GetUserSchedules($id: ID!) {
  getUserSchedules: getUser(id: $id) {
    id
    created {
      items {
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
          pictureUrl
          avatar {
            key
            bucket
            name
          }
        }
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
            website
            bio
            me
            createdCount
            followingCount
            createdAt
          }
          followersCount
          eventsCount
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
}`;
export const getUserData = `query GetUserData($filter: ModelEventFilterInput, $limit: Int) {
  getUserData: me {
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
    state {
      id
      allowedEvents
      mutedEvents
      mutedSchedules
      keysToRemove
      checkedList
    }
    created {
      items {
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
        events(filter: $filter, limit: $limit, sortDirection: ASC) @connection(key: "events") {
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
      }
      nextToken
    }
    following {
      nextToken
      items {
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
            website
            bio
            me
            createdCount
            followingCount
            createdAt
          }
          events(filter: $filter, limit: $limit, sortDirection: ASC) @connection(key: "events") {
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
    bookmarks(limit: $limit, sortDirection: DESC) @connection(key: "bookmarks") {
      items {
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
      }
      nextToken
    }
  }
}`;

export const getDeltaUpdates = `query GetDeltaUpdates($lastSync: String!) {
  deltaSync(lastSync: $lastSync) @connection(key: "deltaSync") {
    events {
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
      aws_ds
    }
    schedules {
      id
      name
      description
      topic
      isPublic
      status
      updatedAt
      location
      picture {
        key
        bucket
      }
      aws_ds
    }
  }
}`;

export const getNotifications = `query GetNotifications($lastSync: String!) {
  notifications(lastSync: $lastSync) @connection(key: "notifications") {
    id
    subject
    message
    topic
    type
    image {
      key
      bucket
      name
    }
    timestamp
    entityId
    extraData {
      title
      content
      pictureUrl
      ref
    }
  }
}`;
export const listFollowers = `query GetScheduleFollowers($id: ID!, $limit: Int, $nextToken: String) {
  listFollowers: getSchedule(id: $id) {
    id
    followersCount
    followers(limit: $limit, nextToken: $nextToken, sortDirection: DESC) @connection(key: "followers") {
      items {
        id
        user {
          id
          me
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
        }
        createdAt
      }
      nextToken
    }
  }
}`;
export const searchSchedules = `query SearchSchedules($filter: ModelScheduleFilterInput!, $limit: Int, $nextToken: String) {
  searchSchedules(filter: $filter, limit: $limit, nextToken: $nextToken) @connection(key: "searchSchedules") {
    items {
      id
      name
      description
      topic
      isPublic
      isOwner
      isFollowing
      location
      status
      author {
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
        me
        createdCount
        followingCount
        createdAt
      }
      picture {
        key
        bucket
      }
      followersCount
      eventsCount
      createdAt
      updatedAt
    }
    nextToken
  }
}`;
export const searchEvents = `query SearchEvents($filter: ModelEventFilterInput!, $limit: Int, $nextToken: String) {
  searchEvents(filter: $filter, limit: $limit, nextToken: $nextToken) @connection(key: "searchEvents") {
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
      isOffline
      isOwner
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
    }
    nextToken
  }
}`;
export const listBookmarks = `query GetEventBookmarks($id: ID!, $limit: Int, $nextToken: String) {
  listBookmarks: getEvent(id: $id) {
    id
    bookmarksCount
    bookmarks(limit: $limit, nextToken: $nextToken, sortDirection: DESC) @connection(key: "bookmarks") {
      items {
        id
        user {
          id
          me
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
        }
        createdAt
      }
      nextToken
    }
  }
}`;
export const nearbyEvents = `query GetNearbyEvents($filter: GeoSearchFilterInput!, $limit: Int, $nextToken: String) {
  nearbyEvents(filter: $filter, limit: $limit, nextToken: $nextToken) @connection(key: "nearbyEvents") {
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
}`;
