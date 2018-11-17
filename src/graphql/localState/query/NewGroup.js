import gql from 'graphql-tag';

export default gql`
  mutation CreateGroup($input: CreateGroupInput!){
    createGroup(input: $input) @client {
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