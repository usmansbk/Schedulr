import gql from 'graphql-tag';

export default gql`
  mutation JoinClass($input: JoinClassInput!) {
    joinClass(input: $input) {
      myClass {
        id
        name
        description
        privacy
        url
        isPrivate
        isClosed
        isMember
        status
        isAuthor
        thumbnail {
          id
          path
        }
        author {
          id
          name
          photo
        }
        logo {
          id
          path
        }
        membersCount
        createdAt
        updatedAt
      }
    }
  }
`