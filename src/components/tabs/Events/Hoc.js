import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import SimpleToast from 'react-native-simple-toast';
import { inject, observer } from 'mobx-react';
import gql from 'graphql-tag';
import Events from './Events';
import { listAllEvents } from 'mygraphql/queries';
import { listAllEventsDelta } from 'mygraphql/deltasync';

const alias = 'withEventsContainer';

export default inject("stores")(observer(
  compose(
    withNavigationFocus,
    graphql(gql(listAllEvents), {
      alias,
      options: props => {
        const skipBaseQuery = props.stores.deltaSync.skipBaseQuery;
        return {
          fetchPolicy: skipBaseQuery ? 'cache-only' : 'cache-and-network',
          notifyOnNetworkStatusChange: true,
          onCompleted: () => !skipBaseQuery && props.stores.deltaSync.updateBaseLastSyncTimestamp(),
        };
      },
      skip: props => {
        return !props.navigation.isFocused();
      },
      props: ({ data, ownProps}) => ({
        loading: data.loading || data.networkStatus === 4,
        events: data && data.listAllEvents && data.listAllEvents.items || [],
        nextToken: data && data.listAllEvents && data.listAllEvents.nextToken,
        error: data.error && !data.listAllEvents,
        onRefreshAll: () =>  data.refetch(),
        ...ownProps
      })
    }),
    graphql(gql(listAllEventsDelta), {
      alias,
      options: props => ({
        fetchPolicy: 'no-cache',
        notifyOnNetworkStatusChange: true,
        variables: {
          lastSync: props.stores.deltaSync.lastSync
        },
        onCompleted: () => props.stores.deltaSync.updateLastSyncTimestamp(),
        update: (cache, data) => {
          SimpleToast.show(`${data}`, SimpleToast.SHORT);
        }
      }),
      skip: props => {
        const skipBaseQuery = props.stores.deltaSync.skipBaseQuery;
        const isFocused = props.navigation.isFocused();
        return !isFocused && !skipBaseQuery;
      },
      props: ({ data, ownProps }) => ({
        refreshing: data.loading || data.networkStatus === 4,
        onRefresh: () => data.refetch(),
        ...ownProps
      })
    })
  )(Events)
));