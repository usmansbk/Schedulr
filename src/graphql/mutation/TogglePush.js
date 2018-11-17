import gql from 'graphql-tag';

export default gql`
  mutation TogglePush {
    togglePush @client
  }
`