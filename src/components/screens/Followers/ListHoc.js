import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import List from 'components/lists/Followers';
import { listFollowers } from 'api/queries';
import { COMMENTS_LIMIT } from 'lib/constants';

const LIMIT = COMMENTS_LIMIT;
const alias = 'withScheduleFollowers';

export default graphql(gql(listFollowers), {
  alias,
  options: props => ({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: props.id
    },
    fetchPolicy: 'cache-and-network'
  }),
  props: ({ data, ownProps }) => ({
    followers: data && data.listFollowers && data.listFollowers.followers.items || [],
    nextToken: data && data.listFollowers && data.listFollowers.followers.nextToken,
    loading: data.loading || (data.networkStatus === 4),
    error: data.error,
    onRefresh: () => data.refetch(),
    ...ownProps
  })
})(List);