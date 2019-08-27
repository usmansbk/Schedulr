import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/EventSearch';
import { getEvents } from 'lib/calendr';
import { getUserData, searchEvents } from 'api/queries';
import { searchEventFilter } from 'api/filters';
import { sortBookmarks, mergeEvents } from 'lib/utils';

function filterEvents(events, query) {
  return sortBookmarks(getEvents(events.filter(
    item => item.title.toLowerCase().includes(query.toLowerCase()) ||
     (item.category && item.category.toLowerCase().includes(query.toLowerCase())))));
}

class Events extends React.Component {

  static navigationOptions() {
    return {
      tabBarLabel: I18n.get("SEARCH_eventsTabLabel")
    };
  }

  render() {
    const { stores } = this.props;

    const { query, isConnected, location, userId } = stores.appState;
    
    return (
      <ListHoc
        query={query}
        id={userId}
        isConnected={isConnected}
        location={location.lat ? location : null}
        search
      />
    );
  }
}

const ListHoc = compose(
  graphql(gql(getUserData), {
    alias: 'withSearchEventsOffline',
    skip: props => props.isConnected,
    options: props => ({
      fetchPolicy: 'cache-only',
      variables: {
        id: props.id
      }
    }),
    props: ({ data, ownProps }) => ({
      events: data && data.getUserData && filterEvents(mergeEvents(data.getUserData), ownProps.query),
      ...ownProps
    })
  }),
  graphql(gql(searchEvents), {
    alias: 'withSearchEventsOnline',
    skip: props => !(props.isConnected && props.query),
    options: props => ({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
      variables: {
        filter: searchEventFilter(props.query)
      }
    }),
    props: ({ data, ownProps }) => ({
      loading: data && data.loading || data.networkStatus === 4,
      events: data && data.searchEvents && getEvents(data.searchEvents.items) || [],
      nextToken: data && data.searchEvents && data.searchEvents.nextToken,
      ...ownProps
    })
  })
)(List);

export default inject("stores")(observer(Events));