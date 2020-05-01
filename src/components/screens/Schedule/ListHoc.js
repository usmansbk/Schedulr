import React from 'react';
import { Dimensions } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getScheduleEvents } from 'api/queries';
import List from 'components/lists/Events';
import Fab from 'components/common/Fab';
import { baseEventsFilter } from 'graphql/filters';
import Suspense from 'components/common/Suspense';

const HEIGHT = Dimensions.get('window').height / 2;
const alias = 'withScheduleEventsContainer';

class ListHoc extends React.Component {
  state = {
    offsetY: 0,
    display: false
  };

  componentDidMount = () => {
    setTimeout(() => this.setState({
      display: true
    }), 0);
  };

  _onScroll = (offsetY) => {
    this.setState({ offsetY });
  };

  _eventsListRef = ref => this.eventsListRef = ref;

  _scrollToTop = () => {
    this.eventsListRef && this.eventsListRef.scrollToTop();
  };

  render() {
    if (!this.state.display) return <Suspense />;
    const {
      id,
      loading,
      error,
      events,
      isAuth,
      isOwner,
      navigation
    } = this.props;

    return <>
      <List
        id={id}
        isAuth={isAuth}
        isOwner={isOwner}
        loading={loading}
        error={error}
        // onRef={this._eventsListRef}
        ref={this._eventsListRef}
        events={events}
        navigation={navigation}
        listType="schedule"
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
    loading: data && (data.loading || data.networkStatus === 4),
    error: data.error,
    onRefresh: () => data.refetch(),
    events: (data && data.getScheduleEvents && data.getScheduleEvents.events.items) || [],
    ...ownProps
  }) 
})(ListHoc);