import { graphql, compose } from 'react-apollo';
import SimpleToast from 'react-native-simple-toast';
import gql from 'graphql-tag';
import ScheduleEvents from './ScheduleEvents';
import moment from 'moment';
import { getSchedule, listAllEvents, listScheduleEvents } from 'mygraphql/queries';
import { filterEvents, filterPastEvents } from 'mygraphql/filter';
import { sortBookmarks } from 'lib/utils';
import { getEvents } from 'lib/calendr';

const alias = 'withScheduleEventsContainer';

const PAGE_SIZE = 21;

export default compose(
  graphql(gql(getSchedule), {
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
      schedule: data && data.getSchedule,
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
        sortBookmarks(getEvents(data.listAllEvents.items.filter(event => event.schedule && (event.schedule.id === ownProps.id))))
      ),
      fetchPastEvents: (nextToken, date) => data.fetchMore({
        query: gql(listScheduleEvents),
        variables: {
          id: ownProps.id,
          filter: filterPastEvents(date),
          nextToken
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult.listScheduleEvents || !fetchMoreResult.listScheduleEvents.events.items.length) {
            SimpleToast.show("No past events", SimpleToast.SHORT);
            return prev;
          }
          return Object.assign({}, prev, {
            listAllEvents: Object.assign({}, prev.listAllEvents, {
              items: [...prev.listAllEvents.items, ...fetchMoreResult.listScheduleEvents.events.items]
            })
          })
        }
      }),
      ...ownProps
    })
  }),
  graphql(gql(listScheduleEvents), {
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
          if (!fetchMoreResult.listScheduleEvents || !fetchMoreResult.listScheduleEvents.events.items.length) {
            SimpleToast.show("No past events", SimpleToast.SHORT);
            return prev;
          }
          return Object.assign({}, prev, {
            listScheduleEvents: Object.assign({}, prev.listScheduleEvents, fetchMoreResult.listScheduleEvents, {
              events: Object.assign({}, prev.listScheduleEvents.events, fetchMoreResult.listScheduleEvents.events, {
                items: [...prev.listScheduleEvents.events.items, ...fetchMoreResult.listScheduleEvents.events.items]
              })
            })
          })
        }
      }),
      events: data && data.listScheduleEvents && data.listScheduleEvents.events && sortBookmarks(getEvents(data.listScheduleEvents.events.items)),
      nextToken: data && data.listScheduleEvents && data.listScheduleEvents.events && data.listScheduleEvents.events.nextToken,
      ...ownProps
    }) 
  })
)(ScheduleEvents);