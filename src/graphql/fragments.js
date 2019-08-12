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

export const getScheduleEvents = gql`
  fragment scheduleEvents on Schedule {
    events {
      items {
        id
        title
        description
        venue
        category
        startAt
        endAt
        allDay
        recurrence
        until
        isPublic
        isOwner
        isCancelled
        cancelledDates
        author {
          id
          name
          me
        }
        schedule {
          id
          name
        }
        commentsCount
        bookmarksCount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getBookmarks = gql`
  fragment myBookmarks on User {
    id
  }
`;