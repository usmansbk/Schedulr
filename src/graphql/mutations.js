// eslint-disable
// this is an auto generated file. This will be overwritten

export const LoginUser = `mutation LoginUser($input: LoginInput!) {
  loginUser(input: $input) {
    id
    name
    email
    pictureUrl
    followingCount
    createdCount
  }
}
`;

export const createBoard = `mutation CreateBoard($input: CreateBoardInput!) {
  createBoard(input: $input) {
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
export const updateBoard = `mutation UpdateBoard($input: UpdateBoardInput!) {
  updateBoard(input: $input) {
    id
    name
    description
    isPublic
    updatedAt
  }
}
`;
export const deleteBoard = `mutation DeleteBoard($input: DeleteBoardInput!) {
  deleteBoard(input: $input) {
    id
  }
}
`;
export const followBoard = `mutation FollowBoard($input: FollowBoardInput!) {
  followBoard(input: $input) {
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
export const unfollowBoard = `mutation UnfollowBoard($input: UnfollowBoardInput!) {
  unfollowBoard(input: $input) {
    id
    isFollowing
    followersCount
  }
}
`;
export const closeBoard = `mutation CloseBoard($input: CloseBoardInput!) {
  closeBoard(input: $input) {
    id
    status
    updatedAt
  }
}
`;
export const openBoard = `mutation OpenBoard($input: OpenBoardInput!) {
  openBoard(input: $input) {
    id
    status
    updatedAt
  }
}
`;
export const createEvent = `mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
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
    until
    eventType
    board {
      id
      name
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
`;
export const updateEvent = `mutation UpdateEvent($input: UpdateEventInput!) {
  updateEvent(input: $input) {
    id
    title
    description
    venue {
      address
    }
    startAt
    endAt
    allDay
    repeat
    until
    eventType
    updatedAt
  }
}
`;
export const deleteEvent = `mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
    id
    board {
      id
      eventsCount
    }
  }
}
`;
export const cancelEvent = `mutation CancelEvent($input: CancelEventInput!) {
  cancelEvent(input: $input) {
    id
    isCancelled
    cancelledDates
    updatedAt
  }
}
`;
export const starEvent = `mutation StarEvent($input: StarEventInput!) {
  starEvent(input: $input) {
    id
    starsCount
    isStarred
  }
}
`;
export const unstarEvent = `mutation UnstarEvent($input: UnstarEventInput!) {
  unstarEvent(input: $input) {
    id
    starsCount
    isStarred
  }
}
`;
export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
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
`;
export const deleteComment = `mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    id
    event {
      id
      commentsCount
    }
  }
}
`;
