import gql from 'graphql-tag';

export default gql`
  mutation UpdateLoginStatus($isLoggedIn: Boolean) {
    updateLoginStatus(isLoggedIn: $isLoggedIn) @client
  }
`