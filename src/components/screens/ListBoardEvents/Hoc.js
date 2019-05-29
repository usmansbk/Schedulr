import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import Screen from './BoardEvents';
import { getBoard, listAllEvents, listBoardEvents } from 'mygraphql/queries';
import logger, { analytics } from 'config/logger';

const alias = 'withBoardEventsContainer';

export default compose(
  graphql(gql(getBoard), {
    alias,
    options: props => ({
      variables: {
        id: props.id,
      },
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
    }),
    props: ({ data, ownProps }) => ({
      error: data.error,
      loading: data.loading || (data.networkStatus === 4),
      board: data && data.getBoard,
      ...ownProps,
    })
  }),
  graphql(gql(listAllEvents), {
    alias,
    skip: props => !props.cacheFirst,
    options: {
      fetchPolicy: 'cache-only',
    },
    props: ({ data, ownProps}) => ({
      loadingEvents: data.loading,
      loadingEventsError: data.error,
      events: (
        data && data.listAllEvents && data.listAllEvents.items && 
        data.listAllEvents.items.filter(event => event.board.id === ownProps.id)
      ),
      ...ownProps
    })
  }),
  graphql(gql(listBoardEvents), {
    alias,
    skip: props => props.cacheFirst,
    options: props => ({
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: {
        id: props.id
      },
      onError: error => {
        SimpleToast.show('Connection error', SimpleToast.SHORT);
        logger.show(error.message);
        analytics({
          name: 'list_board_events',
          alias,
          error
        });
      }
    }),
    props: ({ data, ownProps}) => ({
      loadingEvents: data.loading || data.networkStatus === 4,
      loadingEventsError: data.error,
      events: (
        data && data.listBoardEvents &&
        data.listBoardEvents.events &&
        data.listBoardEvents.events.items
      ),
      ...ownProps
    }) 
  })
)(Screen);