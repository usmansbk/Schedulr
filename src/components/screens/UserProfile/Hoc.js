import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigationFocus } from 'react-navigation';
import UserProfile from './UserProfile';
import { getUser } from 'api/queries';

const alias = 'withUserProfile';

export default compose(
  withNavigationFocus,
  graphql(gql(getUser), {
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
      user: data && data.getUser,
      ...ownProps,
    })
  })
)(UserProfile)