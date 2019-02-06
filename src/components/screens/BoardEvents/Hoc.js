import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './BoardEvents';
import { getBoard, listAllEvents } from '../../../graphql/queries';

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
    options: {
      fetchPolicy: 'cache-only',
    },
    props: ({ data, ownProps}) => ({
      fetchingEvents: data.loading,
      fetchingEventsError: data.error,
      events: data && data.listAllEvents && data.listAllEvents.items && data.listAllEvents.items.filter(event => event.board.id === ownProps.id),
      ...ownProps
    })
  })
)(Screen);