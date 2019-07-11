export const listAllEvents = `query ListAllEventsDelta($lastSync: AWSTimestamp!) {
  listAllEvents(lastSync: $lastSync) {
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
      board {
        id
        name
        isFollowing
        eventsCount
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


export const listAllBoards = `query ListAllBoardsDelta($lastSync: AWSTimestamp!) {
  listAllBoardsDelta(lastSync: $lastSync) {
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