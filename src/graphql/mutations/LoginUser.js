import gql from 'graphql-tag';

export default gql`
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      id
      name
      email
      pictureUrl
    }
  }
`;