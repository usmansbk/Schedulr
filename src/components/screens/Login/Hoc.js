import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Container from './Container';
import { LoginUser } from '../../../graphql/mutations';
import defaults from '../../../graphql/localstate/defaults';

export default graphql(gql(LoginUser), {
  alias: 'withLoginContainer',
  props: ({ mutate, ownProps }) => ({
    onLogin: async (input) => await mutate({
      variables: {
        input
      },
      update: (cache, { data: { loginUser } }) => {
        const me = { me: loginUser };
        cache.writeData({
          data: me
        });
        cache.writeData({
          data: { settings: defaults.settings }
        });
        cache.writeData({
          data: { remindMeBefore: defaults.remindMeBefore }
        });
      }
    }),
    ...ownProps
  })
})(Container);