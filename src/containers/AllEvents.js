import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import Firebase from 'react-native-firebase';
import Events from '../components/EventList';
import PageLoading from '../components/common/PageLoading';
import ALL_EVENTS from '../graphql/localState/query/AllEvents';

export default class EventsTab extends PureComponent {
  componentDidMount = () => {
    Firebase.analytics().logEvent('load_all_events');
  }

  render() {
    return (
      <Query
        query={ALL_EVENTS}
        notifyOnNetworkStatusChange
      >
        {({ loading, data={}, networkStatus }) => {
          if (loading) return <PageLoading />
          const { events={} } = data;
          const { edges=[] } = events;

          return (
            <Events
              loading={networkStatus === 4}
              edges={edges}
            />
          )
        }}
      </Query>
    )
  }
}