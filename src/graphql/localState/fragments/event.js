import gql from 'graphql-tag';

export default gql`
fragment event on Event {
  id
  name
  description
  eventType
  start
  end
  repeat
  location
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
`;