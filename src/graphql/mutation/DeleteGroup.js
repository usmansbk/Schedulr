import gql from 'graphql-tag';

export default gql`
  mutation DeleteGroup($input: DeleteGroupInput!) {
    deleteGroup(input: $input) @client
  }
`