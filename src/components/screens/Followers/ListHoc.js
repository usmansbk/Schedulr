import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import List from 'components/lists/Followers';
import { listFollowers } from 'api/queries';
import { PAGINATION_LIMIT } from 'lib/constants';

const alias = 'withScheduleFollowers';

export default graphql(gql(listFollowers), {
  alias,
  options: props => ({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: props.id,
      limit: PAGINATION_LIMIT
    },
    fetchPolicy: 'cache-and-network'
  }),
  props: ({ data, ownProps }) => ({
    followers: data && data.listFollowers && data.listFollowers.followers.items || [],
    nextToken: data && data.listFollowers && data.listFollowers.followers.nextToken,
    loading: data.loading || (data.networkStatus === 4),
    error: data.error,
    onRefresh: () => data.refetch(),
    fetchMore: (nextToken) => data.fetchMore({
      variables: {
        nextToken
      },
      updateQuery: (prev, { fetchMoreResult }) => {},
    }),
    ...ownProps
  })
})(List);