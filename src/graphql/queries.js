/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($email: String!) {
  getUser(email: $email) {
    email
    name
    pictureUrl
    website
  }
}
`;
export const listUsers = `query ListUsers(
  $email: String
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(
    email: $email
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      email
      name
      pictureUrl
      website
    }
    nextToken
  }
}
`;
