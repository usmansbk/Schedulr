import gql from 'graphql-tag';

export default gql`
  query Members($id: ID!, $first: Int, $after: String) {
    classroom(id: $id) {
      id
      members(first: $first, after: $after) @connection(key: "members")  {
        edges {
          node {
            id
            name
            photo
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`