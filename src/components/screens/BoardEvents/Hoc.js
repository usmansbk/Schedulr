import { graphql, compose } from 'react-apollo';
import SimpleToast from 'react-native-simple-toast';
import gql from 'graphql-tag';
import BoardEvents from './BoardEvents';
import { getBoard, listAllEvents, listBoardEvents } from 'mygraphql/queries';
import { filterEvents, filterPastEvents } from 'mygraphql/filter';
import { sortStarredEvents } from 'lib/utils';
import { getEvents } from 'lib/calendr';

const alias = 'withBoardEventsContainer';

const PAGE_SIZE = 21;

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
        sortStarredEvents(getEvents(data.listAllEvents.items.filter(event => event.board && (event.board.id === ownProps.id))))
      ),
      fetchPastEvents: (nextToken, date) => data.fetchMore({
        query: gql(listBoardEvents),
        variables: {
          id: ownProps.id,
          filter: filterPastEvents(date),
          nextToken,
          limit: PAGE_SIZE
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult.listBoardEvents || !fetchMoreResult.listBoardEvents.events.items.length) {
            SimpleToast.show("No past events", SimpleToast.SHORT);
            return prev;
          }
          return Object.assign({}, prev, {
            listAllEvents: Object.assign({}, prev.listAllEvents, {
              items: [...prev.listAllEvents.items, ...fetchMoreResult.listBoardEvents.events.items]
            })
          })
        }
      }),
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
        id: props.id,
        filter: filterEvents
      },
    }),
    props: ({ data, ownProps}) => ({
      loadingEvents: data.loading || data.networkStatus === 4,
      loadingEventsError: data.error,
      onRefresh: () => data.refetch(),
      fetchPastEvents: (nextToken, date) => data.fetchMore({
        variables: {
          filter: filterPastEvents(date || moment()),
          nextToken,
          limit: PAGE_SIZE
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult.listBoardEvents || !fetchMoreResult.listBoardEvents.events.items.length) {
            SimpleToast.show("No past events", SimpleToast.SHORT);
            return prev;
          }
          return Object.assign({}, prev, {
            listBoardEvents: Object.assign({}, prev.listBoardEvents, fetchMoreResult.listBoardEvents, {
              events: Object.assign({}, prev.listBoardEvents.events, fetchMoreResult.listBoardEvents.events, {
                items: [...prev.listBoardEvents.events.items, ...fetchMoreResult.listBoardEvents.events.items]
              })
            })
          })
        }
      }),
      events: data && data.listBoardEvents && data.listBoardEvents.events && sortStarredEvents(getEvents(data.listBoardEvents.events.items)),
      nextToken: data && data.listBoardEvents && data.listBoardEvents.events && data.listBoardEvents.events.nextToken,
      ...ownProps
    }) 
  })
)(BoardEvents);