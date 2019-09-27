import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { withNavigationFocus } from 'react-navigation';
import { getUserData, getDeltaUpdates, getNotifications } from 'api/queries';
import { baseEventsFilter } from 'api/filters';
import updateBaseCache from 'helpers/deltaSync';
import Events from './Events';

const alias = 'withEventsContainer';
const BaseQuery = gql(getUserData);
const DeltaQuery = gql(getDeltaUpdates);
const GetNotifications = gql(getNotifications);

export default inject("stores")(observer(
  compose(
    withNavigationFocus,
    graphql(BaseQuery, {
      alias,
      options: props => ({
        fetchPolicy: 'cache-first',
        // notifyOnNetworkStatusChange: true,
        variables: {
          id: props.id,
          filter: baseEventsFilter(),
          limit: 50
        }
      }),
      props: ({ data, ownProps}) => ({
        loading: data && data.loading,
        data: data && data.getUserData,
        userId: ownProps.stores.appState.userId,
        onRefresh: () => data.refetch(),
        fetchMore: () => {
          const lastSyncTimestamp = ownProps.stores.appState.lastSyncTimestamp;
          data.fetchMore({
            query: DeltaQuery,
            variables:{
              lastSync: String(lastSyncTimestamp)
            },
            updateQuery: (prev, { fetchMoreResult }) => (
              updateBaseCache({
                prev,
                fetchMoreResult,
                stores: ownProps.stores
              })
            )
          })
        },
        ...ownProps
      })
    }),
    graphql(GetNotifications, {
      alias: 'withGetNotifications',
      name: 'notifications',
      options: props => ({
        fetchPolicy: 'network-only',
        variables: {
          lastSync: String(props.stores.notificationsStore.lastSyncTimestamp)
        },
        onCompleted: (data) => {
          props.stores.notificationsStore.updateLastSyncTimestamp();
          const { notifications } = data;
          if (notifications && notifications.length) {
            props.stores.notificationsStore.appendNotifications(notifications);
            props.fetchMore && props.fetchMore();
          }
        }
      }),
    }),

  )(Events)
));