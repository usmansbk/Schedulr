import gql from 'graphql-tag';

export default gql`
  subscription USER_REACTED($eventId: ID!) {
    userReacted(eventId: $eventId) {
      id
      likes
      likesCount
    }
  }
`