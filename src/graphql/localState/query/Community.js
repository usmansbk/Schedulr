import gql from 'graphql-tag';

export default gql`
  {
    community @client {
      id
      name
      url
      logo
    }
  }
`