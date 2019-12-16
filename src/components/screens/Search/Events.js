import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/EventSearch';
import { getUserData } from 'api/queries';
import { mergeEvents, filterEvents } from 'lib/utils';

class Events extends React.Component {

  static navigationOptions() {
    return {
      tabBarLabel: I18n.get("SEARCH_eventsTabLabel")
    };
  }

  render() {
    const { stores } = this.props;

    const { query, isConnected, userId } = stores.appState;
    
    return (
      <ListHoc
        query={query}
        id={userId}
        isConnected={isConnected}
        location={stores.locationStore.location}
        search
      />
    );
  }
}

const ListHoc = compose(
  graphql(gql(getUserData), {
    alias: 'withSearchEventsOffline',
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
)(List);

export default inject("stores")(observer(Events));