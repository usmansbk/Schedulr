import { graphql } from 'react-apollo';
import { Analytics } from 'aws-amplify';
import gql from 'graphql-tag';
import Info from './Info';
import { getBoard } from '../../../graphql/queries';

export default graphql(gql(getBoard), {
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
    board: data && data.getBoard,
    ...ownProps,
  })
})(Info)