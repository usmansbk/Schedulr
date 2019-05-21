import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import List from 'components/lists/Followers';
import { listBoardFollowers } from 'mygraphql/queries';

const DEFAULT_LIMIT = 15;

export default graphql(gql(listBoardFollowers), {
  alias: 'withBoardFollowers',
  options: props => ({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: props.id
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: ({ data, ownProps }) => ({
    followers: data && data.listFollowers && data.listFollowers.items,
    nextToken: data && data.listFollowers && data.listFollowers.nextToken,
    loading: data.loading || data.networkStatus === 4,
    error: data.error,
    onRefresh: async () => {
      try {
        await data.refetch()
      } catch(e) {
        SimpleToast.show('Refresh failed', SimpleToast.SHORT);
      }
    },
    fetchMoreComments: async (nextToken=null, limit=DEFAULT_LIMIT) => data.fetchMore({
      variables: {
        nextToken,
        limit
      },
      updateQuery:  (previousResult, { fetchMoreResult }) => {
        const newComments = (fetchMoreResult && fetchMoreResult.data && fetchMoreResult.listBoardFollowers
          && data.listBoardFollowers.items);
        if (newComments) {
          return 
        }
        return previousResult;
      }
    }),
    ...ownProps
  })
})(List);