import gql from 'graphql-tag';

export default gql`
  {
    groups @client {
      edges{
        node{
          id
          name
          description
          url
          privacy
          isPrivate
          isClosed
          isMember
          status
          pictureUrl
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
`