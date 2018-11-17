import gql from 'graphql-tag';

export default gql`
  query Event($id: ID!) {
    event(id: $id) @client {
      id
      name
      description
      eventType
      start
      end
      repeat
      location
      calendarId
      isCancelled
      isStarred
      isAuthor
      isMember
      commentsCount
      group {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`