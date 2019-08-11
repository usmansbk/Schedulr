/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const getSchedule = `query GetSchedule($id: ID!) {
  getSchedule(id: $id) {
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
