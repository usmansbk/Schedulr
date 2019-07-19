export const listAllEventsDelta = `query ListAllEventsDelta($lastSync: AWSTimestamp!) {
  listAllEventsDelta(lastSync: $lastSync) {
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
      author {
        id
        name
      }
      commentsCount
      createdAt
      updatedAt 
      aws_ds
      timestamp
    }
  }
}`;


export const listAllBoardsDelta = `query ListAllBoardsDelta($lastSync: AWSTimestamp!) {
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
      aws_ds
      timestamp
    }
  }
}
`;