import gql from 'graphql-tag';

export default gql`
fragment toggleStar on Event {
  id
  isStarred
  updatedAt
}
`;