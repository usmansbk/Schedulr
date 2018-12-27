import { graphql } from 'react-apollo';
import Container from './Container';
import { LoginUser } from '../../../graphql/mutations';

export default graphql(LoginUser, {
  props: ({ mutate, navigation }) => ({
    navigation,
    onLogin: async (input) => await mutate({
      variables: {
        input
      }
    })
  })
})(Container);