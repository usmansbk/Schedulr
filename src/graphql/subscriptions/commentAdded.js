import gql from 'graphql-tag';

export default gql`
  subscription COMMENT_ADDED($eventId: ID!) {
    commentAdded(eventId: $eventId) {
      id
      message
      createdAt
      event {
        id
      }
      author {
        id
        name
        photo
      }
    }
  }
`