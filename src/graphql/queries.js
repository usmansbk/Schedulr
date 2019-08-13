/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    email
    name
    pictureUrl
    website
    followingCount
    createdCount
    createdAt
    updatedAt
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
    isPublic
    isOwner
    isCancelled
    cancelledDates
    author {
      id
      name
    }
    schedule {
      id
      name
      eventsCount
      followersCount
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
    comments {
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
    status
    author {
      id
      name
      pictureUrl
    }
    followersCount
    eventsCount
    createdAt
    updatedAt
  }
}
`;
export const getScheduleWithEvents = `query GetScheduleWithEvents($id: ID!) {
  getSchedule(id: $id) {
    id
    name
    description
    isPublic
    isOwner
    status
    author {
      id
      name
      pictureUrl
    }
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
        isCancelled
        cancelledDates
        author {
          id
          name
        }
        schedule {
          id
          name
          eventsCount
          followersCount
        }
        commentsCount
        bookmarksCount
        createdAt
        updatedAt
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
          isPublic
          isOwner
          isCancelled
          cancelledDates
          author {
            id
            name
          }
          schedule {
            id
            name
            eventsCount
            followersCount
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
        status
        author {
          id
          name
          pictureUrl
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
          status
          author {
            id
            name
            pictureUrl
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
export const getUserData = `query GetUserData($id: ID!) {
  getUserData: getUser(id: $id) {
    id
    created {
      items {
        id
        name
        description
        isPublic
        isOwner
        status
        author {
          id
          name
          pictureUrl
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
            isPublic
            isOwner
            isCancelled
            cancelledDates
            author {
              id
              name
            }
            schedule {
              id
              name
              eventsCount
              followersCount
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
          status
          author {
            id
            name
            pictureUrl
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
              isPublic
              isOwner
              isCancelled
              cancelledDates
              author {
                id
                name
              }
              schedule {
                id
                name
                eventsCount
                followersCount
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
        createdAt
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
          isPublic
          isOwner
          isCancelled
          cancelledDates
          author {
            id
            name
          }
          schedule {
            id
            name
            eventsCount
            followersCount
          }
          commentsCount
          bookmarksCount
          createdAt
          updatedAt
        }
        createdAt
      }
      nextToken
    }
  }
}`
