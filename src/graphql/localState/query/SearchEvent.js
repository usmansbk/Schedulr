import gql from 'graphql-tag';

export default gql`
  query SearchEvent($input: SearchInput!) {
    search(input: $input) @client {
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
            }
            createdAt
            updatedAt
            calendarId
          }
        }
      }
    }
  }
`