import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Container from './Container';
import { loginUser } from '../../../graphql/mutations';

export default graphql(gql(loginUser), {
  alias: 'withLoginContainer',
  props: ({ mutate, ownProps }) => ({
    onLogin: async (input) => await mutate({
      variables: {
        input
      },
      update: (cache, { data: { loginUser } }) => {
        const data = { me: loginUser };
      	cache.writeData({ data });
      }
    }),
    ...ownProps
  })
})(Container);