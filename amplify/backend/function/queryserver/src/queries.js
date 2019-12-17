const gql = require('graphql-tag');

module.exports = {
  created: gql`query CreatedSchedules($id: ID!) {
    getUser(id: $id) {
      id
      allCreated {
        items {
          id
          name
          description
          isPublic
          isOwner
          isFollowing
          isOffline
          location
          status
          picture {
            key
            bucket
            name
          }
          author {
            id
            name
            createdCount
          }
          followersCount
          eventsCount
          createdAt
          updatedAt
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
              forever
              isPublic
              isOwner
              isCancelled
              isBookmarked
              isOffline
              cancelledDates
              banner {
                bucket
                key
                name
              }
              author {
                id
                name
              }
              schedule {
                id
                name
                isFollowing
              }
              commentsCount
              bookmarksCount
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        nextToken
      }
    }
  }`,
  following: gql`query FollowingSchedules($id: ID!) {
    getUser(id: $id) {
      id
      allFollowing {
        nextToken
        items {
          id
          schedule {
            id
            name
            description
            isPublic
            isOwner
            isFollowing
            location
            status
            picture {
              key
              bucket
              name
            }
            author {
              id
              name
              pictureUrl
              avatar {
                key
                bucket
                name
              }
              website
              bio
              me
              createdCount
              followingCount
              createdAt
            }
            events @connection(key: "events") {
              nextToken
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
                forever
                isPublic
                isOwner
                isOffline
                isCancelled
                isBookmarked
                cancelledDates
                banner {
                  bucket
                  key
                  name
                }
                author {
                  id
                  name
                }
                schedule {
                  id
                  name
                  isFollowing
                }
                commentsCount
                bookmarksCount
                createdAt
                updatedAt
              }
            }
            followersCount
            eventsCount
            createdAt
            updatedAt
          }
        }
      }
    }
  }`,
}
