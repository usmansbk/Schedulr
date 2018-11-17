import gql from 'graphql-tag';

export default gql`
  mutation AddCommunity($input: AddCommunityInput!) {
    addCommunity(input: $input) @connection(key: "addCommunity") {
      community {
        id
        name
        url
        logo
        isProtected
      }
    }
  }
`