import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Analytics } from 'aws-amplify';
import Screen from './Screen';
import { getBoard, listBoardEvents } from '../../../graphql/queries';

const alias = 'withBoardEventsContainer';

export default compose(
  graphql(gql(getBoard), {
    alias,
    options: props => ({
      variables: {
        id: props.id,
      },
      fetchPolicy: 'cache-only'
    }),
    props: ({ data, ownProps }) => ({
      error: data.error,
      loading: data.loading,
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
  }),
  graphql(gql(listBoardEvents), {
    alias,
    options: props => ({
      variables: {
        id: props.id
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    }),
    props: ({ data, ownProps}) => ({
      fetchingEvents: data.loading || data.networkStatus === 4,
      fetchingEventsError: data.error,
      events: data && data.listBoardEvents && data.listBoardEvents.events && data.listBoardEvents.events.items,
      nextToken: data && data.listBoardEvents && data.listBoardEvents.events && data.listBoardEvents.events.nextToken,
      onRefreshEvents: async () => {
        try {
          await data.refetch()
        } catch(e) {
          console.log(e);
          // Log error if it occurs multiple times
          Analytics.record({
            name: e.name,
            attributes: {
              message: e.message,
              component: 'EventsContainer'
            }
          })
        }
      },
      ...ownProps
    })
  })
)(Screen);