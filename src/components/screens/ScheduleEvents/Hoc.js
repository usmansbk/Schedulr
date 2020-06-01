import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {getSchedule,  getScheduleEvents } from 'api/queries';
import { EventFlatList } from 'lib/calendar';
import { baseEventsFilter, pastEventsFilter } from 'graphql/filters';
import updateQuery from 'helpers/updateQuery';
import { PAGINATION_LIMIT } from 'lib/constants';
import ScheduleEvents from './ScheduleEvents';

const alias = 'withScheduleEventsContainer';

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
      loading: data && (data.loading || (data.networkStatus === 4) || (data.networkStatus === 3)),
      onRefresh: () => data.refetch(),
      schedule: data && data.getSchedule,
      ...ownProps,
    })
  }),
  graphql(gql(getScheduleEvents), {
    alias,
    options: props => ({
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      variables: {
        id: props.id,
        filter: baseEventsFilter()
      },
    }),
    skip: props => {
      console.log(props.schedule)
      const { isPublic, isOwner, isFollowing } = props.schedule || {};
      const isAuth = isPublic || isOwner || isFollowing;
      return !isAuth;
    },
    props: ({ data, ownProps}) => ({
      listLoading: data && (data.loading || data.networkStatus === 4 || data.networkStatus === 3),
      listError: data.error,
      onListRefresh: () => data.refetch({
        filter: baseEventsFilter(),
        limit: PAGINATION_LIMIT,
        nextToken: null
      }),
      fetchMore: (nextToken, before) => data.fetchMore({
        variables: {
          limit: PAGINATION_LIMIT,
          nextToken,
          filter: pastEventsFilter(before)
        },
        updateQuery: (prev, { fetchMoreResult }) => (
          updateQuery({
            prev,
            fetchMoreResult,
            rootField: 'getScheduleEvents',
            connectionField: 'events'
          })
        )
      }),
      events: data && data.getScheduleEvents && data.getScheduleEvents.events && EventFlatList(data.getScheduleEvents.events.items),
      nextToken: data && data.getScheduleEvents && data.getScheduleEvents.events && data.getScheduleEvents.events.nextToken,
      ...ownProps
    }) 
  })
)(ScheduleEvents);