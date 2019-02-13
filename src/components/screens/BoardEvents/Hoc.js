import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './BoardEvents';
import { getBoard, listAllEvents, listBoardEvents } from '../../../graphql/queries';

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
    skip: props => props.cacheFirst,
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
    skip: props => !props.cacheFirst,
    options: props => ({
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      variables: {
        id: props.id
      },
    }),
    props: ({ data, ownProps}) => ({
      loadingEvents: data.loading || data.networkStatus === 4,
      loadingEventsError: data.error,
      events: (
        data && data.listBoardEvents &&
        data.listBoardEvents.getBoard &&
        data.listBoardEvents.getBoard.events &&
        data.listBoardEvents.getBoard.events.items
      ),
      ...ownProps
    }) 
  })
)(Screen);