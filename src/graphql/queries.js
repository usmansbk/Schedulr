// eslint-disable
// this is an auto generated file. This will be overwritten
export const userLogin = `{
  me {
    id
    name
    email
    pictureUrl
  }
}`;

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    email
    pictureUrl
  }
}
`;
export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
    id
    title
    description
    location {
      address
      latitude
      longitude
    }
    startAt
    endAt
    allDay
    isCancelled
    repeat
    eventType
    board {
      id
      name
    }
    cancelledDates
    starsCount
    isStarred
    isAuthor
    author {
      id
      name
      email
      pictureUrl
    }
    commentsCount
    createdAt
    updatedAt
  }
}
`;
export const getBoard = `query GetBoard($id: ID!) {
  getBoard(id: $id) {
    id
    name
    description
    status
    isPublic
    isFollowing
    isAuthor
    author {
      id
      name
      email
      pictureUrl
    }
    followersCount
    createdAt
    updatedAt
  }
}
`;

export const listAllEvents = `query ListAllEvents($limit: Int, $nextToken: String) {
  listAllEvents(limit: $limit, nextToken: $nextToken) @connection(key: "listAllEvents") {
    nextToken
    items {
      id
      title
      description
      location {
        address
        latitude
        longitude
      }
      startAt
      endAt
      allDay
      isCancelled
      repeat
      eventType
      board {
        id
        name
      }
      cancelledDates
      starsCount
      isStarred
      isAuthor
      author {
        id
        name
        email
        pictureUrl
      }
      commentsCount
      createdAt
      updatedAt  
    }
  }
}`

export const listAllBoards = `query ListAllBoards($limit: Int, $nextToken: String) {
  listAllBoards(limit: $limit, nextToken: $nextToken) {
    nextToken
    items {
      id
      name
      description
      status
      isPublic
      isFollowing
      isAuthor
      author {
        id
        name
        email
        pictureUrl
      }
      followersCount
      createdAt
      updatedAt
    }
  }
}
`;

export const searchEvent = `query SearchEvent($filter: SearchFilterInput, $limit: Int, $nextToken: String) {
  searchEvent(filter: $filter, limit: $limit, nextToken: $nextToken) {
    nextToken
    items {
      id
      title
      description
      location {
        address
        latitude
        longitude
      }
      startAt
      endAt
      allDay
      isCancelled
      repeat
      eventType
      board {
        id
        name
        description
        isPublic
        isFollowing
        isAuthor
        followersCount
        createdAt
        updatedAt
      }
      cancelledDates
      starsCount
      isStarred
      isAuthor
      author {
        id
        name
        email
        pictureUrl
      }
      commentsCount
      createdAt
      updatedAt
    }
  }
}
`;
export const searchBoard = `query SearchBoard($filter: SearchFilterInput, $limit: Int, $nextToken: String) {
  searchBoard(filter: $filter, limit: $limit, nextToken: $nextToken) {
    nextToken
    items {
      id
      name
      description
      status
      isPublic
      isFollowing
      isAuthor
      author {
        id
        name
        email
        pictureUrl
      }
      followersCount
      createdAt
      updatedAt
    }
  }
}
`;
