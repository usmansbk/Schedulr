import React from 'react';
import uuidv5 from 'uuid/v5';
import memoize from 'memoize-one';
import List from 'components/lists/Events';
import FAB from 'components/common/Fab';
import schdlAll from 'helpers/setReminders';
import { mergeEvents } from 'lib/utils';
import gql from 'graphql-tag';
import { getNotifications } from 'api/queries';
import client from 'config/client';

export default class Events extends React.Component {
  static defaultProps = {
    mutedEvents: [],
    allowedEvents: []
  }

  componentDidMount = () => {
    if (!this.props.loading && this.props.isConnected) {
      this.props.fetchMore();
    }
  };

  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();
  
  componentDidUpdate = () => {
    const { mutedEvents, allowedEvents } = this.props;
    schdlAll(
      this.events,
      mutedEvents,
      allowedEvents
    );
  };
 
  _navigateToNewEvent = () => {
    this.props.navigation.navigate('NewEvent', {
      eventScheduleId : uuidv5(this.props.userId, uuidv5.DNS)
    });
  };

  _onRefresh = () => {
    if (!this.props.loading) {
      this.props.onRefresh && this.props.onRefresh();
    }
  };

  _fetchMore = () => {
    if (!this.props.loading) {
      this.props.fetchMore && this.props.fetchMore();
    }
  };
  
  _mergeAllEvents = memoize(mergeEvents);

  get events() {
    return this._mergeAllEvents(this.props.data);
  }

  _fetchNotifications = () => {
    const { stores, fetchMore } = this.props;
    client.query({
      fetchPolicy: 'network-only',
      query: gql(getNotifications),
      variables: {
        lastSync: String(stores.notificationsStore.lastSyncTimestamp)
      }
    }).then((result) => {
      const { data: { notifications }={} } = result || {};
      stores.notificationsStore.updateLastSyncTimestamp();
      if (notifications && notifications.length) {
        stores.notificationsStore.appendNotifications(notifications);
      }
    }).catch(console.log);
    fetchMore && fetchMore();
  };

  componentDidMount = () => {
    if ( !(this.props.loading || this.props.fetchingMore) ) {
      this._fetchNotifications();
    }
  };

  render() {
    return (
      <>
        <List
          isAuth
          events={this.events}
          navigation={this.props.navigation}
          onRefresh={this._onRefresh}
          loading={this.props.loading}
          fetchingMore={this.props.fetchingMore}
          fetchMore={this._fetchNotifications}
        />
        <FAB
          icon="edit-2"
          onPress={this._navigateToNewEvent}
        />
      </>
    )
  }
}