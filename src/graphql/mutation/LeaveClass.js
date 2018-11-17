import gql from 'graphql-tag';

export default gql`
  mutation LeaveClass($input: LeaveClassInput!) {
    leaveClass(input: $input) {
      myClass {
        id
        isMember
      }
    }
  }
`