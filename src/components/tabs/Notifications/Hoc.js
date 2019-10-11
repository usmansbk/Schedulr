import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { getNotifications, getDeltaUpdates, getUserData } from 'api/queries';
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
      fetchDelta: () => {
        const lastSyncTimestamp = ownProps.stores.appState.lastSyncTimestamp;
        client.query({
          fetchPolicy: 'network-only',
          query: gql(getDeltaUpdates),
          variables:{
            lastSync: String(lastSyncTimestamp)
          },
        }).then(async (result) => {
          const { data: fetchMoreResult } = result;
          const { data: prev }= await client.query({
            fetchPolicy: 'cache-only',
            query: gql(getUserData),
            variables: {
              id: ownProps.stores.appState.userId,
            }
          });
          updateBaseCache({
            prev,
            fetchMoreResult,
            stores: ownProps.stores
          });
        }).catch(console.log);
      },
      ...ownProps
    })
  })
)(Notifications)));