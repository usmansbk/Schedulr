import gql from 'graphql-tag';

export default gql`
  mutation CloseGroup($input: CloseGroupInput!) {
    closeGroup(input: $input) @client
  }
`