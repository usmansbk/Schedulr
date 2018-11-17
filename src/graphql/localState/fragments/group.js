import gql from 'graphql-tag';

export default gql`
  fragment group on Group {
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
`;