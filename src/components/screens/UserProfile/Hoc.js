import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import UserProfile from './UserProfile';
import { getUser } from 'mygraphql/queries';
import logger from 'config/logger';

const alias = 'withUserProfile';

export default graphql(gql(getUser), {
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
      try {
        await data.refetch();
      } catch (error) {
        logger.debug(error.message);
      }
    },
    user: data && data.getUser,
    ...ownProps,
  })
})(UserProfile)