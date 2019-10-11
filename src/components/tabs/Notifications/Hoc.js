import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { getNotifications, getDeltaUpdates, getUserData } from 'api/queries';
import { baseEventsFilter } from 'api/filters';
import Notifications from './Notifications';
import client from 'config/client';
import updateBaseCache from 'helpers/deltaSync';

const GetNotifications = gql(getNotifications);

export default inject("stores")(observer(
compose(
  withNavigationFocus,
  graphql(GetNotifications, {
    alias: 'withGetNotifications',
    skip: props => !props.navigation.isFocused(),
    options: props => ({
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      variables: {
        lastSync: String(props.stores.notificationsStore.lastSyncTimestamp)
      },
      onCompleted: (data) => {
        const { notifications } = data;
        props.stores.notificationsStore.updateLastSyncTimestamp();
        if (notifications && notifications.length) {
          props.stores.notificationsStore.appendNotifications(notifications);
        }
      }
    }),
    props: ({ data, ownProps }) => ({
      loading: data && data.loading,
      refreshing: data && data.networkStatus === 4,
      hasDelta: data && data.notifications && data.notifications.length,
      onRefresh: () => data.refetch(),
      ...ownProps
    })
  })
)(Notifications)));