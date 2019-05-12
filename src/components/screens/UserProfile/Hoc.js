import { graphql } from 'react-apollo';
// import { Analytics } from 'aws-amplify';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import UserProfile from './UserProfile';
import { getUser } from 'mygraphql/queries';

export default graphql(gql(getUser), {
  options: props => ({
    variables: {
      id: props.navigation.getParam('id'),
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network'
  }),
  props: ({ data, ownProps }) => ({
    loading: data.loading,
    refreshing: data.networkStatus === 4,
    error: data.error,
    onRefresh: async () => {
      try {
        await data.refetch()
      } catch(e) {
        SimpleToast.show(e.message, SimpleToast.SHORT);
        // Log error if it occurs multiple times
        // Analytics.record({
        //   name: e.name,
        //   attributes: {
        //     message: e.message,
        //     component: 'UserContainer'
        //   }
        // })
      }
    },
    user: data && data.getUser,
    ...ownProps,
  })
})(UserProfile)