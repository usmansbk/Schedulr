import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getScheduleEvents } from 'api/queries';
import { sortEvents } from 'lib/utils';
import { processEvents } from 'lib/calendr';
import List from 'components/lists/ScheduleEvents';
import { baseEventsFilter, pastEventsFilter } from 'graphql/filters';
import { PAGINATION_LIMIT } from 'lib/constants';
import updateQuery from 'helpers/updateQuery';

const alias = 'withScheduleEventsContainer';

class ListHoc extends React.Component {

  _onRefresh = () => this.props.onRefresh && this.props.onRefresh();
  _fetchPastEvents = (nextToken, time) => this.props.fetchMore && this.props.fetchMore(nextToken, time);

  render() {
    const {
      loading,
      error,
      events,
      isAuth,
      eventsCount
    } = this.props;

    const eventsLength = events ? events.length : [];

    const pastEventsCount = eventsCount - eventsLength;

    return <List
            listType="schedule"
            events={events}
            eventsCount={eventsCount}
            pastEventsCount={pastEventsCount}
            loading={loading}
            error={error}
            onRefresh={this._onRefresh}
            fetchPastEvents={this._fetchPastEvents}
            isAuth={isAuth}
          />;
  }
}

export default graphql(gql(getScheduleEvents), {
  alias,
  options: props => ({
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      id: props.id,
      filter: baseEventsFilter()
    },
  }),
  skip: props => !props.isAuth,
  props: ({ data, ownProps}) => ({
    loading: data && data.loading || data.networkStatus === 4,
    error: data.error,
    onRefresh: () => data.refetch(),
    fetchMore: (nextToken) => data.fetchMore({
      variables: {
        limit: PAGINATION_LIMIT,
        nextToken,
        filter: pastEventsFilter()
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
    events: data && data.getScheduleEvents && data.getScheduleEvents.events && sortEvents(processEvents(data.getScheduleEvents.events.items)),
    nextToken: data && data.getScheduleEvents && data.getScheduleEvents.events && data.getScheduleEvents.events.nextToken,
    ...ownProps
  }) 
})(ListHoc);