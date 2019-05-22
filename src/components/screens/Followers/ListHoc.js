import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import List from 'components/lists/Followers';
import { listBoardFollowers } from 'mygraphql/queries';

const LIMIT = 1;

export default graphql(gql(listBoardFollowers), {
  alias: 'withBoardFollowers',
  options: props => ({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: props.id,
      limit: LIMIT
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: ({ data, ownProps }) => ({
    followers: data && data.listFollowers && data.listFollowers.items || [],
    nextToken: data && data.listFollowers && data.listFollowers.nextToken,
    loading: data.loading || data.networkStatus === 4,
    error: data.error,
    onRefresh: async () => {
      try {
        await data.refetch();
      } catch(e) {
        SimpleToast.show('Refresh failed', SimpleToast.SHORT);
      }
    },
    fetchMoreFollowers: async (nextToken=null, limit=LIMIT) => data.fetchMore({
      variables: {
        nextToken,
        limit
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const moreFollowers = fetchMoreResult.listFollowers && fetchMoreResult.listFollowers.items;
        if (fetchMoreResult.listFollowers.nextToken !== previousResult.listFollowers.nextToken) {
          if (moreFollowers) {
            return Object.assign({}, previousResult, {
              listFollowers: Object.assign({}, previousResult.listFollowers,  {
                nextToken: fetchMoreResult.listFollowers.nextToken,
                items: [
                  ...previousResult.listFollowers.items,
                  ...moreFollowers
                ]
              })
            });
          }
        }
        return previousResult;
      }
    }),
    ...ownProps
  })
})(List);