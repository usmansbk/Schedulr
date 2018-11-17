import gql from 'graphql-tag';

export default gql`
  mutation StarEvent($input: StarEventInput!) {
    starEvent(input: $input) @client {
      id
      isStarred
    }
  }
` 