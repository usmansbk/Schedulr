import gql from 'graphql-tag';

export default gql`
  mutation ToggleReminderSound {
    toggleReminderSound @client
  }
`