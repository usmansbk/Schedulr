/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
      me
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
      me
    }
    followersCount
    eventsCount
    createdAt
    updatedAt
  }
}
`;
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
          me
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
              me
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
      items {
        schedule {
          events {
            items {
              id
              title
            }
            nextToken
          }
        }
      }
      nextToken
    }
    bookmarks {
      items {
        event {
          id
          title
        }
      }
      nextToken
    }
  }
}`
