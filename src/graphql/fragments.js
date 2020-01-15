import gql from 'graphql-tag';

export const getUserSchedules = gql`
  fragment mySchedules on User {
    created {
      items {
        id
        name
        description
        topic
        isPublic
        status
        location
      }
    }
  }
`;
