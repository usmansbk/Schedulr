import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import List from 'components/lists/Followers';
import { listFollowers } from 'api/queries';
import { PAGINATION_LIMIT } from 'lib/constants';
import updateQuery from 'helpers/updateQuery';

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
    followers: (data && data.listFollowers && data.listFollowers.followers.items) || [],
    nextToken: data && data.listFollowers && data.listFollowers.followers.nextToken,
    loading: data && data.loading || (data.networkStatus === 4),
    error: data.error,
    onRefresh: () => data.refetch(),
    fetchMore: (nextToken) => data.fetchMore({
      variables: {
        nextToken
      },
      updateQuery: (prev, { fetchMoreResult }) => (
        updateQuery({
          prev,
          fetchMoreResult,
          rootField: 'listFollowers',
          connectionField: 'followers'
        })
      ),
    }),
    ...ownProps
  })
})(List);