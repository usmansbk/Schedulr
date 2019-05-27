import { graphql } from 'react-apollo';
import SimpleToast from 'react-native-simple-toast';
// import { Analytics } from 'aws-amplify';
import gql from 'graphql-tag';
import Boards from './Boards';
import { listAllBoards } from 'mygraphql/queries';

export default graphql(gql(listAllBoards), {
  alias: 'withBoardsContainer',
  options: {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  },
  props: ({ data, ownProps}) => ({
    loading: data.loading || data.networkStatus === 4,
    boards: data && data.listAllBoards && data.listAllBoards.items || [],
    error: data.error && !data.listAllBoards,
    onRefresh: async () => {
      try {
        await data.refetch()
      } catch(error) {
        SimpleToast.show(error.message, SimpleToast.SHORT);
        // Log error if it occurs multiple times
        // Analytics.record({
        //   name: e.name,
        //   attributes: {
        //     message: e.message,
        //     component: 'BoardsContainer'
        //   }
        // })
      }
    },
    ...ownProps
  })
})(Boards);