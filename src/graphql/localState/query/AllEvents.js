import gql from 'graphql-tag';

export default gql`
  {
    events @client {
      edges{
        node{
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
`