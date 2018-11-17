import gql from 'graphql-tag';

export default gql`
  mutation UpdateGroup($input: UpdateGroupInput!) {
    editGroup(input: $input) @client
  }
`