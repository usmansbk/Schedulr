import React from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import List from 'components/lists/EventSearch';
import Suspense from 'components/common/Suspense';
import {getUserData, searchEvents} from 'api/queries';
import {mergeEvents, filterEvents} from 'lib/utils';
import {searchEventFilter} from 'api/filters';
// import {SEARCH_LIMIT} from 'lib/constants';
import updateQuery from 'helpers/updateQuery';

class Events extends React.Component {
  state = {
    display: false,
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

  static navigationOptions() {
    return {
      tabBarLabel: I18n.get('SEARCH_eventsTabLabel'),
    };
  }

  render() {
    if (!this.state.display) return <Suspense />;
    const {stores} = this.props;

    const {query, isConnected, userId} = stores.appState;

    return (
      <ListHoc
        query={query}
        id={userId}
        isConnected={isConnected}
        location={stores.location.searchLocation}
        search
      />
    );
  }
}

const ListHoc = compose(
  graphql(gql(getUserData), {
    alias: 'withSearchEventsOffline',
    skip: (props) => props.isConnected,
    options: () => ({
      fetchPolicy: 'cache-only',
    }),
    props: ({data, ownProps}) => ({
      events:
        data &&
        data.getUserData &&
        filterEvents(mergeEvents(data.getUserData, [], false), ownProps.query),
      ...ownProps,
    }),
  }),
  graphql(gql(searchEvents), {
    alias: 'withSearchEventsOnline',
    skip: (props) => !(props.isConnected && props.query),
    options: (props) => ({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
      variables: {
        filter: searchEventFilter(props.query, props.location),
        // limit: SEARCH_LIMIT,
        nextToken: null,
      },
      // onCompleted: (result) => console.log(result),
    }),
    props: ({data, ownProps}) => ({
      loading:
        data &&
        (data.loading || data.networkStatus === 4 || data.networkStatus === 3),
      events: (data && data.searchEvents && data.searchEvents.items) || [],
      nextToken: data && data.searchEvents && data.searchEvents.nextToken,
      onRefresh: () => data.refetch(),
      fetchMore: (nextToken) =>
        data.fetchMore({
          variables: {
            nextToken,
          },
          updateQuery: (prev, {fetchMoreResult}) =>
            updateQuery({
              prev,
              fetchMoreResult,
              rootField: 'searchEvents',
            }),
        }),
      ...ownProps,
    }),
  }),
)(List);

export default inject('stores')(observer(Events));
