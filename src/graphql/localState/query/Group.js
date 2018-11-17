import gql from 'graphql-tag';

export default gql`
  query Group($id: ID!) {
    group(id: $id) @client {
      id
      name
      description
      url
      privacy
      isPrivate
      isClosed
      isMember
      isAuthor
      status
      pictureUrl
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
`