import { graphql } from 'react-apollo';
import { Analytics } from 'aws-amplify';
import SimpleToast from 'react-native-simple-toast';
import gql from 'graphql-tag';
import Info from './Info';
import { getBoard } from 'mygraphql/queries';

const alias = 'withBoardInfoContainer';

export default graphql(gql(getBoard), {
  alias,
  options: props => ({
    variables: {
      id: props.id,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network'
  }),
  props: ({ data, ownProps }) => ({
    loading: data.loading || data.networkStatus === 4,
    error: data.error,
    onRefresh: async () => {
      try {
        await data.refetch()
      } catch(e) {
        SimpleToast.show(e.message, SimpleToast.SHORT);
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
    board: data && data.getBoard,
    ...ownProps,
  })
})(Info)