import { graphql } from 'react-apollo';
import Container from './Container';
import { LoginUser } from '../../../graphql/mutations';

export default graphql(LoginUser, {
  props: ({ mutate }) => ({
    onLogin: (input) => mutate({
      variables: input
    }),
  })
})(Container);