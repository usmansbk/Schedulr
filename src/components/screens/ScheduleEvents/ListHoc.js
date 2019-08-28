import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getScheduleEvents } from 'api/queries';
import { sortBookmarks } from 'lib/utils';
import { getEvents } from 'lib/calendr';
import List from 'components/lists/ScheduleEvents';
import { baseEventsFilter, pastEventsFilter } from 'graphql/filters';

const alias = 'withScheduleEventsContainer';

class ListHoc extends React.Component {

  _onRefresh = () => this.props.onRefresh();
  _fetchPastEvents = (nextToken, time) => {
    console.log(nextToken, time)
    this.props.fetchMore(nextToken, time);
  }

  render() {
    const {
      loading,
      error,
      events,
      isAuth,
      eventsCount
    } = this.props;

    return <List
            listType="schedule"
            events={events}
            eventsCount={eventsCount}
            loading={loading}
            error={error}
            onRefresh={this._onRefresh}
            fetchPastEvents={this._fetchPastEvents}
            isAuth={isAuth}
          /> 
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
    loading: data.loading || data.networkStatus === 4,
    error: data.error,
    onRefresh: () => data.refetch(),
    fetchPastEvents: () => null,
    fetchMore: (nextToken, time) => data.fetchMore({
      variables: {
        nextToken,
        fiter: pastEventsFilter(time)
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log(fetchMoreResult);
      }
    }),
    events: data && data.getScheduleEvents && sortBookmarks(getEvents(data.getScheduleEvents.events.items)),
    ...ownProps
  }) 
})(ListHoc);