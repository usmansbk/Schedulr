import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {getScheduleEvents} from 'api/queries';
import List from 'components/lists/Bookmarks';
import {baseEventsFilter, pastEventsFilter} from 'graphql/filters';
import {PAGINATION_LIMIT} from 'lib/constants';
import updateQuery from 'helpers/updateQuery';
import Suspense from 'components/common/Suspense';

const alias = 'withScheduleEventsContainer';

class ListHoc extends React.Component {
  state = {
    display: false,
  };

  _onRefresh = () => this.props.onRefresh && this.props.onRefresh();
  _fetchPastEvents = (nextToken) => {
    const first = this.props.events[0];
    const before = first && first.startAt;
    this.props.fetchMore && this.props.fetchMore(nextToken, before);
  };

  componentDidMount = () => {
    this.timer = setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  render() {
    if (!this.state.display) return <Suspense />;
    const {
      loading,
      error,
      events,
      isAuth,
      eventsCount,
      navigation,
    } = this.props;

    const eventsLength = events ? events.length : 0;

    const pastEventsCount = eventsCount - eventsLength;

    return (
      <List
        listType="schedule"
        events={events}
        eventsCount={eventsCount}
        pastEventsCount={pastEventsCount}
        loading={loading}
        error={error}
        onRefresh={this._onRefresh}
        fetchPastEvents={this._fetchPastEvents}
        isAuth={isAuth}
        navigation={navigation}
      />
    );
  }
}

export default graphql(gql(getScheduleEvents), {
  alias,
  options: (props) => ({
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      id: props.id,
      filter: baseEventsFilter(),
    },
  }),
  skip: (props) => !props.isAuth,
  props: ({data, ownProps}) => ({
    loading:
      data &&
      (data.loading || data.networkStatus === 4 || data.networkStatus === 3),
    error: data.error,
    onRefresh: () =>
      data.refetch({
        filter: baseEventsFilter(),
        limit: PAGINATION_LIMIT,
        nextToken: null,
      }),
    fetchMore: (nextToken, before) =>
      data.fetchMore({
        variables: {
          limit: PAGINATION_LIMIT,
          nextToken,
          filter: pastEventsFilter(before),
        },
        updateQuery: (prev, {fetchMoreResult}) =>
          updateQuery({
            prev,
            fetchMoreResult,
            rootField: 'getScheduleEvents',
            connectionField: 'events',
          }),
      }),
    events:
      data &&
      data.getScheduleEvents &&
      data.getScheduleEvents.events &&
      data.getScheduleEvents.events.items,
    nextToken:
      data &&
      data.getScheduleEvents &&
      data.getScheduleEvents.events &&
      data.getScheduleEvents.events.nextToken,
    ...ownProps,
  }),
})(ListHoc);
