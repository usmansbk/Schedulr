import gql from 'graphql-tag';

export default gql`
fragment editEvent on Event {
  id
  name
  description
  eventType
  location
  start
  end
  repeat
  updatedAt
}
`;