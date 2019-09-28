import React from 'react';
import { Dimensions } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getScheduleEvents } from 'api/queries';
import List from 'components/lists/Events';
import Fab from 'components/common/Fab';
import { baseEventsFilter } from 'graphql/filters';

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
      isAuth,
      navigation
    } = this.props;

    return <>
      <List
        id={id}
        isAuth={isAuth}
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

export default graphql(gql(getScheduleEvents), {
  alias,
  options: props => ({
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      id: props.id,
      filter: baseEventsFilter(),
    },
  }),
  skip: props => !props.isAuth,
  props: ({ data, ownProps}) => ({
    loading: data.loading || data.networkStatus === 4,
    error: data.error,
    onRefresh: () => data.refetch(),
    events: data && data.getScheduleEvents && data.getScheduleEvents.events.items,
    ...ownProps
  }) 
})(ListHoc);