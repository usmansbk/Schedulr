import gql from 'graphql-tag';

export default gql`
  mutation CancelEvent($input: CancelEventInput!) {
    cancelEvent(input: $input) @client
  }
`