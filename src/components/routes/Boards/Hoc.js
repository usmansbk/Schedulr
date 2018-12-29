import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Boards from './Boards';
import { listBoards } from '../../../graphql/queries';

export default graphql(gql(listBoards), {
  alias: 'BoardsContainer',
  options: {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  },
  props: ({ data, ownProps}) => ({
    loading: data.loading || data.networkStatus === 4,
    boards: data && data.listBoards && data.listBoards.items,
    error: data.error,
    onRefresh: () => data.refetch(),
    ...ownProps
  })
})(Boards);