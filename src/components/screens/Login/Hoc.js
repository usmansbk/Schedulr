import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Container from './Container';
import { loginUser as LoginUser } from '../../../graphql/mutations';
import { userLogin } from '../../../graphql/queries';

export default graphql(gql(LoginUser), {
  alias: 'withLoginContainer',
  props: ({ mutate, ownProps }) => ({
    onLogin: async (input) => await mutate({
      variables: {
        input
      },
      update: (cache, { data: { loginUser } }) => {
        const data = { me: loginUser };
        cache.writeQuery({
          query: gql(userLogin),
          data
        });
      }
    }),
    ...ownProps
  })
})(Container);