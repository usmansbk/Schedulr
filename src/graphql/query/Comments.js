import gql from 'graphql-tag';

export default gql`
  query Comments($id: ID!, $last: Int, $before: String) {
    comments(id: $id, last: $last, before: $before) @connection(key: "comments", filter: ["id"]) {
      pageInfo {
        hasPreviousPage
        startCursor
      },
      edges {
        node {
          id
          isAuthor
          isAdmin
          message
          createdAt
          event {
            id
          }
          author {
            id
            name
            photo
          }
        }
      }
    }
  }
`