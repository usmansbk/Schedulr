import gql from 'graphql-tag';

export default gql`
  mutation DeleteComment($input: DeletePostInput!) {
    deletePost(input: $input) {
      id
    }
  }
`