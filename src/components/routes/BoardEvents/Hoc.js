import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Analytics } from 'aws-amplify';
import Screen from './Screen';
import { getBoard } from '../../../graphql/queries';

const alias = 'withBoardEventsContainer';

export default compose(
  graphql(gql(getBoard), {
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
          console.log(e);
          // Log error if it occurs multiple times
          Analytics.record({
            name: e.name,
            attributes: {
              message: e.message,
              component: 'BoardsContainer'
            }
          })
        }
      },
      board: data && data.getBoard,
      ...ownProps,
    })
  })
)(Screen);