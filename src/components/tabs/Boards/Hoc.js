import { graphql } from 'react-apollo';
import SimpleToast from 'react-native-simple-toast';
import gql from 'graphql-tag';
import Boards from './Boards';
import { listAllBoards } from 'mygraphql/queries';
import Logger, { analytics } from 'config/logger';

const alias = 'withBoardsContainer';

export default graphql(gql(listAllBoards), {
  alias,
  options: {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    onError: error => {
      SimpleToast.show('Failed to fetch updates', SimpleToast.SHORT);
      analytics({
        component: alias,
        logType: 'listAllBoardsQuery',
        error
      });
      Logger.debug(error.message);
    }
  },
  props: ({ data, ownProps}) => ({
    loading: data.loading || data.networkStatus === 4,
    boards: data && data.listAllBoards && data.listAllBoards.items || [],
    error: data.error && !data.listAllBoards,
    onRefresh: async () => await data.refetch(),
    ...ownProps
  })
})(Boards);