import gql from 'graphql-tag';

export default gql`
  mutation UpdateLoginAgent($agent: String) {
    updateLoginAgent(agent: $agent) @client
  }
`