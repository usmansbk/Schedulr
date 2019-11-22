/* eslint-disable */
export const me = `query GetUser($id: ID!) {
  me: getUser(id: $id) {
    id
    me
    email
    name
    pictureUrl
    avatar {
      key
      bucket
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
}`

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    me
    name
    pictureUrl
    avatar {
      key
      bucket
    }
    website
    bio
    followingCount
    createdCount
    createdAt
  }
}
`;
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
      isFollowing
    }
    commentsCount
    bookmarksCount
    createdAt
    updatedAt
  }
}
`;
export const getEventComments = `query GetEventComments($id: ID!, $limit: Int, $nextToken: String) {
  getEventComments: getEvent(id: $id) {
    id
    schedule {
      id
    }
    comments(sortDirection: DESC, limit: $limit, nextToken: $nextToken) @connection(key: "comments") {
      items {
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
      nextToken
    }
  }
}`;
export const getSchedule = `query GetSchedule($id: ID!) {
  getSchedule(id: $id) {
    id
    name
    description
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
export const getUserBookmarks = `query GetBookmarks($id: ID!, $nextToken: String, $limit: Int) {
  getUserBookmarks: getUser(id: $id) {
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
export const getUserSchedules = `query GetUserSchedules($id: ID!, $limit: Int) {
  getUserSchedules: getUser(id: $id) {
    id
    created(limit: $limit, sortDirection: ASC) @connection(key: "created") {
      items {
        id
        name
        description
        isPublic
        isOwner
        isFollowing
        location
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
        }
        followersCount
        eventsCount
        createdAt
        updatedAt
      }
      nextToken
    }
    following(limit: $limit, sortDirection: ASC) @connection(key: "following") {
      items {
        id
        schedule {
          id
          name
          description
          isPublic
          isOwner
          isFollowing
          location
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
export const getUserData = `query GetUserData($id: ID!, $filter: ModelEventFilterInput, $limit: Int) {
  getUserData: getUser(id: $id) {
    id
    created(limit: $limit, sortDirection: ASC) @connection(key: "created") {
      items {
        id
        name
        description
        isPublic
        isOwner
        isFollowing
        location
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
    following(limit: $limit, sortDirection: ASC) @connection(key: "following") {
      nextToken
      items {
        id
        schedule {
          id
          name
          description
          isPublic
          isOwner
          isFollowing
          location
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
}`

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
    }
    timestamp
    entityId
    extraData {
      title
      content
      pictureUrl
    }
  }
}`;
export const listFollowers = `query GetScheduleFollowers($id: ID!, $limit: Int, $nextToken: String) {
  listFollowers: getSchedule(id: $id) {
    id
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
export const searchEvents = `query SearchEvents($filter: SearchableEventFilterInput!, $limit: Int, $nextToken: String, $sort: SearchableEventSortInput) {
  searchEvents(filter: $filter, limit: $limit, nextToken: $nextToken, sort: $sort) @connection(key: "searchEvents") {
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
export const searchSchedules = `query SearchSchedules($filter: SearchableScheduleFilterInput!, $limit: Int, $nextToken: String, $sort: SearchableScheduleSortInput) {
  searchSchedules(filter: $filter, limit: $limit, nextToken: $nextToken, sort: $sort) @connection(key: "searchSchedules") {
    items {
      id
      name
      description
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
export const searchPeople = `query SearchPeople($filter: SearchableUserFilterInput!, $limit: Int, $nextToken: String, $sort: SearchableUserSortInput) {
  searchUsers(filter: $filter, limit: $limit, nextToken: $nextToken, sort: $sort) @connection(key: "searchPeople") {
    items {
      id
      name
      pictureUrl
      avatar {
        key
        bucket
      }
      website
      bio
      me
      createdCount
      followingCount
      createdAt
    }
    nextToken
  }
}`;
export const listBookmarks = `query GetEventBookmarks($id: ID!, $limit: Int, $nextToken: String) {
  listBookmarks: getEvent(id: $id) {
    id
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
export const nearbyEvents = `query GetNearbyEvents($location: LocationInput!, $km: Int, $limit: Int, $nextToken: String) {
  nearbyEvents(location: $location, km: $km, limit: $limit, nextToken: $nextToken) @connection(key: "nearbyEvents") {
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
        isFollowing
      }
      commentsCount
      bookmarksCount
      createdAt
      updatedAt
    }
    nextToken
  }
}`