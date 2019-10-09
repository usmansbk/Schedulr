import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { getNotifications } from 'api/queries';
import Notifications from './Notifications';

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
      loading: data && data.loading || data.networkStatus === 4,
      onRefresh: () => data.refetch(),
      ...ownProps
    })
  })
)(Notifications)));