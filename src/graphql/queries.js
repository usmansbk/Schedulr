/* eslint-disable */
// this is an auto generated file. This will be overwritten
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
    followingCount
    createdCount
    createdAt
    updatedAt
  }
}
`;

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
    followingCount
    createdCount
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
    }
    commentsCount
    bookmarksCount
    createdAt
    updatedAt
  }
}
`;
export const getEventComments = `query GetEventComments($id: ID!) {
  getEventComments: getEvent(id: $id) {
    id
    comments(sortDirection: DESC) @connection(key: "comments") {
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
      me
      createdCount
      followingCount
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
export const getScheduleEvents = `query GetScheduleWithEvents($id: ID!) {
  getScheduleEvents: getSchedule(id: $id) {
    id
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
export const getUserBookmarks = `query GetBookmarks($id: ID!) {
  getUserBookmarks: getUser(id: $id) {
    id
    bookmarks {
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
export const getUserData = `query GetUserData($id: ID!, $filter: ModelEventFilterInput) {
  getUserData: getUser(id: $id) {
    id
    created {
      items {
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
        events(filter: $filter) @connection(key: "events") {
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
            me
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
    bookmarks {
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

export const getUserDelta = `query GetUserDelta($id: ID!, $filter: ModelEventFilterInput) {
  getUserDelta: getUser(id: $id) {
    id
    following {
      items {
        id
        schedule {
          id
          name
          description
          isPublic
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
          events(filter: $filter) @connection(key: "events") {
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
          updatedAt
        }
      }
    }
    bookmarks {
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
          }
          commentsCount
          bookmarksCount
          createdAt
          updatedAt
        }
      }
    }
  }
}`
