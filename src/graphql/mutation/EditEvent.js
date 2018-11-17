import gql from 'graphql-tag';

export default gql`
  mutation UpdateEvent($input: UpdateEventInput!) {
    editEvent(input: $input) @client
  }
`