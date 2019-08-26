import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { getUser } from 'api/queries';
import { updateUser } from 'api/mutations';
import Screen from './Screen';

const alias = 'withAvatarViewer';

export default compose(
  graphql(gql(getUser), {
    alias,
    options: props => ({
      variables: {
        id: props.navigation.getParam('id'),
      },
      fetchPolicy: 'cache-only',
    }),
    props: ({ data, ownProps }) => ({
      user: data && data.getUser,
      ...ownProps,
    }),
  }),
  graphql(gql(updateUser), {
    alias,
    props: ({ mutate, ownProps }) => ({
      uploadPhoto: (input) => mutate({
        variables: {
          input
        }
      }),
      ...ownProps
    })
  })
)(Screen)