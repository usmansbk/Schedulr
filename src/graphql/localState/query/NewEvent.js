import gql from 'graphql-tag';

export default gql`
  mutation CreateEvent($input: CreateEventInput!){
    createEvent(input: $input) @client {
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
    }
  }
`