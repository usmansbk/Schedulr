import gql from 'graphql-tag';

export const getUserSchedules = gql`
  fragment mySchedules on User {
    created {
      items {
        id
        name
        description
        isPublic
        status
      }
    }
  }
`;

export const getBookmarks = gql`
  fragment myBookmarks on User {
    id
  }
`;