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
    graphql(GetNotifications, {
      alias: 'withGetNotifications',
      name: 'notifications',
      options: props => ({
        fetchPolicy: 'network-only',
        variables: {
          lastSync: String(props.stores.appState.lastNotifTimestamp)
        },
        onCompleted: (data) => {
          props.stores.appState.updateLastNotifTimestamp();
          const { notifications } = data;
          if (notifications)
            props.stores.appState.setNotificationIndicator(!!notifications.length);
        }
      }),
    }),
    graphql(BaseQuery, {
      alias,
      options: props => ({
        fetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
        variables: {
          id: props.id,
          filter: baseEventsFilter()
        }
      }),
      props: ({ data, ownProps}) => ({
        loading: data && (data.loading || data.networkStatus === 4),
        data: data && data.getUserData,
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
  )(Events)
));