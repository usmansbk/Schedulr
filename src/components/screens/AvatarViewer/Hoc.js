import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { getProfile } from 'api/queries';
import { updateProfile } from 'api/mutations';
import Screen from './Screen';

const alias = 'withAvatarViewer';

export default compose(
  graphql(gql(getProfile), {
    alias,
    options: props => ({
      variables: {
        id: props.navigation.getParam('id'),
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-first',
    }),
    props: ({ data, ownProps }) => ({
      loading: data.loading,
      refreshing: data.networkStatus === 4,
      error: data.error,
      onRefresh: () => data.refetch(),
      user: data && data.getProfile,
      ...ownProps,
    }),
  }),
  graphql(gql(updateProfile), {
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