import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/EventSearch';
import { getEvents } from 'lib/calendr';
import { getUserData } from 'api/queries';
import { sortBookmarks } from 'lib/utils';

function mergeEvents(data, query) {
  let events = [];
  if (!data) return events;
  const { created, following, bookmarks } = data;
  created.items.forEach(schedule => {
    events = events.concat(schedule.events.items);
  });
  following.items.filter(item => Boolean(item.schedule)).forEach(schedule => {
    events = events.concat(schedule.events.items);
  });
  
  bookmarks.items.filter(item => Boolean(item.event) && !item.event.isOwner).forEach(bookmark => {
    events.push(bookmark.event);
  });
  
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
      events: data && data.getUserData && mergeEvents(data.getUserData, ownProps.query),
      ...ownProps
    })
  }),
)(List);

export default inject("stores")(observer(Events));