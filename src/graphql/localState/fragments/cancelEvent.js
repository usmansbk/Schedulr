import gql from 'graphql-tag';

export default gql`
fragment cancelEvent on Event {
  id
  isCancelled
  updatedAt
}
`;