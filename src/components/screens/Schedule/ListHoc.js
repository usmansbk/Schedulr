import React from 'react';
import { Dimensions } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getScheduleWithEvents } from 'api/queries';
import List from 'components/lists/Events';
import Fab from 'components/common/Fab';

const HEIGHT = Dimensions.get('window').height / 2;
const alias = 'withScheduleEventsContainer';

class ListHoc extends React.Component {
  state = {
    offsetY: 0
  };

  _onScroll = (offsetY) => {
    this.setState({ offsetY });
  };

  _eventsListRef = ref => this.eventsListRef = ref;

  _scrollToTop = () => {
    this.eventsListRef && this.eventsListRef.scrollToTop();
  };

  render() {
    const {
      id,
      loading,
      error,
      events,
      navigation
    } = this.props;

    return <>
      <List
        id={id}
        loading={loading}
        error={error}
        ref={this._eventsListRef}
        events={events}
        listType="schedule"
        navigation={navigation}
        handleScroll={this._onScroll}
      /> 
      {
        Boolean(this.state.offsetY > HEIGHT) && (
          <Fab
            icon="chevron-up"
            secondary
            onPress={this._scrollToTop}
          />
        )
      }
      </>
  }
}

export default graphql(gql(getScheduleWithEvents), {
  alias,
  options: props => ({
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      id: props.id
    },
  }),
  props: ({ data, ownProps}) => ({
    loading: data.loading || data.networkStatus === 4,
    error: data.error,
    onRefresh: () => data.refetch(),
    events: data && data.getSchedule && data.getSchedule.events.items,
    ...ownProps
  }) 
})(ListHoc);