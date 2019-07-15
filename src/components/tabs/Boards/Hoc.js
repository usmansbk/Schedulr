import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import Boards from './Boards';
import { listAllBoards } from 'mygraphql/queries';

const alias = 'withBoardsContainer';

export default compose(
  withNavigationFocus,
  graphql(gql(listAllBoards), {
  alias,
  options: {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  },
  props: ({ data, ownProps}) => ({
    loading: data.loading || data.networkStatus === 4,
    boards: data && data.listAllBoards && data.listAllBoards.items || [],
    error: data.error && !data.listAllBoards,
    onRefresh: () => data.refetch(),
    ...ownProps
  })
}))(Boards);