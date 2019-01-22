import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Container from './Container';
import { LoginUser } from '../../../graphql/mutations';
import { Me } from '../../../graphql/queries';

export default graphql(gql(LoginUser), {
  alias: 'withLoginContainer',
  props: ({ mutate, ownProps }) => ({
    onLogin: async (input) => await mutate({
      variables: {
        input
      },
      update: (cache, { data: { loginUser } }) => {
        const me = { me: loginUser };
        cache.writeQuery({
          query: gql(Me),
          data: me
        });
      }
    }),
    ...ownProps
  })
})(Container);