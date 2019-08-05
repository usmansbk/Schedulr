// eslint-disable
// this is an auto generated file. This will be overwritten

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

export const followingSchedules = `query FollowingSchedule($id: ID!, $limit: Int, $nextToken: String) {
  followingSchedules: getUser(id: $id) {
    id
    followingSchedules(limit: $limit, nextToken: $nextToken) {
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

export const createdSchedules = `query FollowingSchedule($id: ID!, $limit: Int, $nextToken: String) {
  createdSchedules: getUser(id: $id) {
    id
    createdSchedules(limit: $limit, nextToken: $nextToken) {
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
    venue {
      address
    }
    startAt
    endAt
    allDay
    isCancelled
    repeat
    forever
    until
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

export const getSchedule = `query GetSchedule($id: ID!) {
  getSchedule(id: $id) {
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
      venue {
        address
      }
      startAt
      endAt
      allDay
      isCancelled
      repeat
      forever
      until
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

export const listAllSchedules = `query ListAllSchedules($limit: Int, $nextToken: String) {
  listAllSchedules(limit: $limit, nextToken: $nextToken)  @connection(key: "listAllSchedules") {
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

export const listScheduleEvents = `query ListScheduleEvents($id: ID!, $limit: Int, $nextToken: String) {
  listScheduleEvents: getSchedule(id: $id) {
    id
    events(limit: $limit, nextToken: $nextToken) {
      nextToken
      items {
        id
        title
        description
        venue {
          address
        }
        startAt
        endAt
        allDay
        isCancelled
        repeat
        forever
        until
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

export const listScheduleFollowers = `query Followers($id: ID!, $limit: Int, $nextToken: String) {
  listFollowers(id: $id, limit: $limit, nextToken: $nextToken)  @connection(key: "listFollowers",filter: ["id"])  {
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
      venue {
        address
      }
      startAt
      endAt
      allDay
      isCancelled
      repeat
      forever
      until
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
export const searchSchedule = `query SearchSchedule($filter: SearchFilterInput, $limit: Int, $nextToken: String) {
  searchSchedule(filter: $filter, limit: $limit, nextToken: $nextToken) {
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