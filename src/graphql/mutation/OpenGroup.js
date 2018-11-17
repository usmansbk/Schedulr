import gql from 'graphql-tag';

export default gql`
  mutation OpenGroup($input: OpenGroupInput!) {
    openGroup(input: $input) @client
  }
`