import gql from 'graphql-tag';

export default gql`
  query SearchEvent($input: SearchInput!) {
    search(input: $input) {
      events {
        edges {
          node {
            id
            name
            description
            eventType
            start
            end
            repeat
            location
            isCancelled
            isStarred
            isAuthor
            isMember
            commentsCount
            group {
              id
              name
              description
            }
            createdAt
            updatedAt
            calendarId
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