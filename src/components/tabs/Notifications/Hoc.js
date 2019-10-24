import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import { I18n } from 'aws-amplify';
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
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      variables: {
        lastSync: String(props.stores.notificationsStore.lastSyncTimestamp)
      },
      onCompleted: (data) => {
        const { notifications } = data;
        props.stores.notificationsStore.updateLastSyncTimestamp();
        if (notifications && notifications.length) {
          SimpleToast.show(I18n.get('TOAST_updatesAvailable'), SimpleToast.SHORT);
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