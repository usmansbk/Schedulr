import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { getNotifications, getDeltaUpdates, getUserData } from 'api/queries';
import updateBaseQuery from 'helpers/deltaSync';
import Notifications from './Notifications';

const GetNotifications = gql(getNotifications);
const GetDeltaUpdates = gql(getDeltaUpdates);
const BaseQuery = gql(getUserData);

export default inject("stores")(observer(
compose(
  withApollo,
  withNavigationFocus,
  graphql(GetNotifications, {
    alias: 'withGetNotifications',
    skip: props => !props.navigation.isFocused(),
    options: props => ({
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      variables: {
        lastSync: String(props.stores.notificationsStore.lastSyncTimestamp)
      },
      onCompleted: (data) => {
        if (data) {
          const { notifications } = data;
          const { stores, client } = props;
          stores.notificationsStore.updateLastSyncTimestamp();
          if (notifications && notifications.length) {
            stores.notificationsStore.appendNotifications(notifications);
            client.query({
              fetchPolicy: 'network-only',
              query: GetDeltaUpdates,
              variables: {
                lastSync: String(stores.appState.lastSyncTimestamp)
              }
            }).then(result => {
              const { data: fetchMoreResult } = result;
              if (fetchMoreResult && fetchMoreResult.deltaSync) {
                const prev = client.readQuery({
                  query: BaseQuery,
                  variables: {
                    id: stores.appState.userId
                  }
                });
                const data = updateBaseQuery({
                  prev,
                  fetchMoreResult,
                  stores
                });
                client.writeQuery({
                  query: BaseQuery,
                  variables: {
                    id: stores.appState.userId
                  },
                  data
                });
              }
            }).catch(console.log);
          }
        }
      }
    }),
    props: ({ data, ownProps }) => ({
      loading: data && data.loading,
      refreshing: data && data.networkStatus === 4,
      hasDelta: data && data.notifications && data.notifications.length,
      onRefresh: () => data.refetch({
        lastSync: String(ownProps.stores.notificationsStore.lastSyncTimestamp)
      }),
      ...ownProps
    })
  })
)(Notifications)));