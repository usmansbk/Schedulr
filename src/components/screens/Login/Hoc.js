import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Container from './Container';
import { LoginUser } from '../../../graphql/mutations';
import { Me, Settings, RemindMeBefore } from '../../../graphql/queries';
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
        cache.writeQuery({
          query: gql(Me),
          data: me
        });
        cache.writeQuery({
          query: gql(Settings),
          data: { settings: defaults.settings }
        });
        cache.writeQuery({
          query: gql(RemindMeBefore),
          data: { remindMeBefore: defaults.remindMeBefore }
        });
      }
    }),
    ...ownProps
  })
})(Container);