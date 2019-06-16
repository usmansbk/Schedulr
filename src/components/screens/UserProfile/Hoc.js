import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigationFocus } from 'react-navigation';
import UserProfile from './UserProfile';
import { getUser } from 'mygraphql/queries';

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
      fetchPolicy: 'cache-and-network',
    }),
    props: ({ data, ownProps }) => ({
      loading: data.loading,
      refreshing: data.networkStatus === 4,
      error: data.error,
      onRefresh: async () => {
        await data.refetch();
      },
      user: data && data.getUser,
      ...ownProps,
    })
  })
)(UserProfile)