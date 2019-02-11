import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import List from '../../lists/Followers';
import { listBoardFollowers } from '../../../graphql/queries';

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
    hasMore: data && data.listFollowers && data.listFollowers.nextToken,
    loading: data.loading || data.networkStatus === 4,
    onRefresh: async () => await data.refetch(),
    ...ownProps
  })
})(List);