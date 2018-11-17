import gql from 'graphql-tag';

export default gql`
  mutation ToggleReminder($key: String!) {
    toggleReminder(key: $key) @client
  }
`