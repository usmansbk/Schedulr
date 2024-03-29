import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getUser } from 'api/queries';
import UserProfile from './UserProfile';

const alias = 'withUserProfile';

export default graphql(gql(getUser), {
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
})(UserProfile)