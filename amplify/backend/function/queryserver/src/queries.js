const gql = require('graphql-tag');

module.exports = {
  created: gql`query CreatedSchedules($id: ID!) {
    getUser(id: $id) {
      id
      name
      allCreated {
        items {
          id
        }
        nextToken
      }
    }
  }`,
  following: gql`query FollowingSchedules($id: ID!) {
    getUser(id: $id) {
      id
      allFollowing {
        items {
          id
        }
        nextToken
      }
    }
  }`,
}
