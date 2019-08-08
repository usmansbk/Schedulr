/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($email: AWSEmail!) {
  getUser(email: $email) {
    name
    email
    pictureUrl
    website
  }
}
`;
export const listUsers = `query ListUsers(
  $email: AWSEmail
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
      name
      email
      pictureUrl
      website
    }
    nextToken
  }
}
`;
