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
        location
      }
    }
  }
`;

export const listNotifications = gql`
  fragment myNotifications on User {
    id
    notifications {
      id
      subjectId
      subject
      message
      topic
      type
      image {
        key
        bucket
      }
      aws_ds
      timestamp
    }
  }
`;