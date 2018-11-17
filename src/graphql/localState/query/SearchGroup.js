import gql from 'graphql-tag';

export default gql`
  query SearchGroup($input: SearchInput!) {
    search(input: $input) @client {
      groups {
        edges {
          node {
            id
            name
            description
            url
            privacy
            isPrivate
            isClosed
            isMember
            status
            isAuthor
            author {
              id
              name
              photo
            }
            membersCount
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`