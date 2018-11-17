import gql from 'graphql-tag';

export default gql`
  {
    loginStatus @client {
      isLoggedIn
      agent
    }
  }
`