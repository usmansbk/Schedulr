import gql from 'graphql-tag';

export default gql`
  mutation UploadClassLogo($input: UploadClassLogoInput!) {
    uploadClassLogo(input: $input) {
      myClass {
        id
        thumbnail {
          id
          path
        }
        logo {
          id
          path
        }
      }
    }
  }
`