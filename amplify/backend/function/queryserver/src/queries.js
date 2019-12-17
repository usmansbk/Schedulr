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
          createdAt
          updatedAt
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
            createdAt
            updatedAt
          }
        }
      }
    }
  }`,
}
