import gql from 'graphql-tag';

export default gql`
  mutation TogglePushSound {
    togglePushSound @client
  }
`