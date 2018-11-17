import gql from 'graphql-tag';

export default gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        id
        message
        isAuthor
        isAdmin
        createdAt
        event {
          id
        }
        author {
          id
          name
          photo
        }
      }
    }
  }
`