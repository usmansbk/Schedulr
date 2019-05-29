import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import List from 'components/lists/Followers';
import { listBoardFollowers } from 'mygraphql/queries';
import logger, { analytics } from 'config/logger';

const LIMIT = 15;
const alias = 'withBoardFollowers';

export default graphql(gql(listBoardFollowers), {
  alias,
  options: props => ({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: props.id,
      limit: LIMIT
    },
    fetchPolicy: 'network-only',
    onError: (error) => {
      SimpleToast.show('Connection error', SimpleToast.SHORT);
      logger.debug(error.message);
      analytics({
        name: 'list_board_followers',
        alias,
        error
      });
    },
  }),
  props: ({ data, ownProps }) => ({
    followers: data && data.listFollowers && data.listFollowers.items || [],
    nextToken: data && data.listFollowers && data.listFollowers.nextToken,
    loading: data.loading || data.networkStatus === 4,
    error: data.error,
    onRefresh: () => data.refetch(),
    fetchMoreFollowers: (nextToken=null, limit=LIMIT) => data.fetchMore({
      variables: {
        nextToken,
        limit
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (fetchMoreResult) {
          const moreFollowers = fetchMoreResult.listFollowers && fetchMoreResult.listFollowers.items;
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