import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import UserProfile from './UserProfile';
import { getUser } from 'mygraphql/queries';
import logger, { analytics } from 'config/logger';

const alias = 'withUserProfile';

export default graphql(gql(getUser), {
  alias,
  options: props => ({
    variables: {
      id: props.navigation.getParam('id'),
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    onError: error => {
      SimpleToast.show('Connection error', SimpleToast.SHORT);
      logger.debug(error.message);
      analytics({
        name: 'user_profile',
        alias,
        error
      });
    }
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