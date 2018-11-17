import gql from 'graphql-tag';

export default gql`
  mutation DeleteEvent($input: DeleteEventInput!) {
    deleteEvent(input: $input) @client
  }
`