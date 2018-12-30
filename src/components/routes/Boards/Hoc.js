import { graphql } from 'react-apollo';
import { Analytics } from 'aws-amplify';
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
    onRefresh: async () => {
      try {
        await data.refetch()
      } catch(e) {
        console.log(e);
        // Log error if it occurs multiple times
        Analytics.record({
          name: error.name,
          attributes: {
            message: error.message,
            component: 'BoardsContainer'
          }
        })
      }
    },
    ...ownProps
  })
})(Boards);