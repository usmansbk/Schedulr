import gql from 'graphql-tag';

export default gql`
  mutation RemoveClassLogo($input: RemoveClassLogoInput!) {
    removeClassLogo(input: $input) {
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