import gql from 'graphql-tag';

export default gql`
  mutation LoginUser($input: UserLoginInput!) {
    login(input: $input) {
      token
      user {
        id
        name
        photo
        email
      }
    }
  }
`