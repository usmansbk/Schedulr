// eslint-disable
// this is an auto generated file. This will be overwritten
export const Me = `{
  me @client {
    id
    name
    email
    pictureUrl
    followingCount
    createdCount
  }
}`;

export const Settings = `{
  settings @client {
    id
    playSound
    vibrate
    headsUp
    starredAlarm
    muteReminder
  }
}`;

export const RemindMeBefore = `{
  remindMeBefore @client {
    id
    fiveMin
    tenMin
    fifteenMin
    thirtyMin
    oneHour
    oneDay
  }
}`

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    email
    pictureUrl
    followingCount
    createdCount
  }
}
`;

export const followingBoards = `query FollowingBoard($id: ID!, $limit: Int, $nextToken: String) {
  followingBoards: getUser(id: $id) {
    id
    followingBoards(limit: $limit, nextToken: $nextToken) {
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
          followingCount
          createdCount
        }
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
    }
  }
}`;

export const createdBoards = `query FollowingBoard($id: ID!, $limit: Int, $nextToken: String) {
  createdBoards: getUser(id: $id) {
    id
    createdBoards(limit: $limit, nextToken: $nextToken) {
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
          followingCount
          createdCount
        }
        eventsCount
        followersCount
        createdAt
        updatedAt
      }
    }
  }
}`;

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
      followingCount
      createdCount
    }
    eventsCount
    followersCount
    createdAt
    updatedAt
  }
}
`;

export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) @client {
    id
    content
    author {
      id
      name
    }
  }
}`;

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
      commentsCount
      createdAt
      updatedAt  
    }
  }
}`;

export const listEventComments = `query ListEventComments($id: ID!, $limit: Int, $nextToken: String) {
  listComments(id: $id, limit: $limit, nextToken: $nextToken) @connection(key: "listComments", filter: ["id"]) {
    nextToken
    items {
      id
      content
      isReply
      toComment {
        id
        content
        author {
          id
          name
        }
      }
      isAuthor
      author {
        id
        name
        pictureUrl
      }
      createdAt
    }
  }
}`;

export const listAllBoards = `query ListAllBoards($limit: Int, $nextToken: String) {
  listAllBoards(limit: $limit, nextToken: $nextToken)  @connection(key: "listAllBoards") {
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
        followingCount
        createdCount
      }
      eventsCount
      followersCount
      createdAt
      updatedAt
    }
  }
}
`;

export const listBoardEvents = `query ListBoardEvents($id: ID!, $limit: Int, $nextToken: String) {
  listBoardEvents: getBoard(id: $id) {
    events(limit: $limit, nextToken: $nextToken) {
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
        commentsCount
        createdAt
        updatedAt  
      }
    }
  }
}`

export const listBoardFollowers = `query Followers($id: ID!, $limit: Int, $nextToken: String) {
  listFollowers(id: $id, limit: $limit, nextToken: $nextToken) {
    nextToken
    items {
      id
      name
      email
      pictureUrl
      followingCount
      createdCount
    }
  }
}`

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
      }
      cancelledDates
      starsCount
      isStarred
      isAuthor
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
        followingCount
        createdCount
      }
      eventsCount
      followersCount
      createdAt
      updatedAt
    }
  }
}
`;
