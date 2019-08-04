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
    venue
    startAt
    endAt
    allDay
    isCancelled
    repeat
    forever
    until
    eventType
    isPublic
    schedule {
      id
      name
      eventsCount
      isFollowing
      isPublic
    }
    author {
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

export const listAllEvents = `query ListAllEvents($filter: QueryFilterInput) {
  listAllEvents(filter: $filter) @connection(key: "listAllEvents") {
    nextToken
    items {
      id
      title
      description
      venue
      startAt
      endAt
      allDay
      isCancelled
      repeat
      forever
      until
      eventType
      isPublic
      schedule {
        id
        name
        isFollowing
        eventsCount
        isPublic
      }
      author {
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
      event {
        id
        commentsCount
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

export const listAllSchedules = `query ListAllSchedules {
  listAllSchedules {
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

export const listScheduleEvents = `query ListScheduleEvents($id: ID!, $limit: Int, $nextToken: String, $filter: QueryFilterInput) {
  listScheduleEvents: getSchedule(id: $id) {
    id
    events(limit: $limit, nextToken: $nextToken, filter: $filter) {
      nextToken
      items {
        id
        title
        description
        venue
        startAt
        endAt
        allDay
        isCancelled
        repeat
        forever
        until
        eventType
        isPublic
        schedule {
          id
          name
          eventsCount
          isFollowing
          isPublic
        }
        author {
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

export const searchEvent = `query SearchEvent($filter: SearchFilterInput, $size: Int, $from: Int) {
  searchEvent(filter: $filter, size: $size, from: $from) @connection(key: "searchEvent") {
    nextToken
    items {
      id
      title
      description
      venue
      startAt
      endAt
      allDay
      isCancelled
      repeat
      forever
      until
      eventType
      isPublic
      schedule {
        id
        name
        eventsCount
        isFollowing
        isPublic
      }
      author {
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
export const searchSchedule = `query SearchSchedule($filter: SearchFilterInput, $size: Int, $from: Int) {
  searchSchedule(filter: $filter, size: $size, from: $from) @connection(key: "searchSchedule") {
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
