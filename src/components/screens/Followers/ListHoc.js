import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import List from 'components/lists/Followers';
import { listBoardFollowers } from 'mygraphql/queries';
import logger from 'config/logger';
import { COMMENTS_LIMIT } from 'lib/constants';

const LIMIT = COMMENTS_LIMIT;
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
  }),
  props: ({ data, ownProps }) => ({
    followers: data && data.listFollowers && data.listFollowers.items || [],
    nextToken: data && data.listFollowers && data.listFollowers.nextToken,
    loading: data.loading || (data.networkStatus === 4),
    error: data.error,
    onRefresh: async () => {
      try {
        await data.refetch();
      } catch (error) {
        logger.debug(error.message);
      }
    },
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