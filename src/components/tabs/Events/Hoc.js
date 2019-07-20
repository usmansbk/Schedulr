import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import gql from 'graphql-tag';
import { eventsDiff } from 'lib/utils';
import Events from './Events';
import { listAllEvents } from 'mygraphql/queries';
import { listAllEventsDelta } from 'mygraphql/deltasync';
import { filterEvents } from 'mygraphql/filter';

const alias = 'withEventsContainer';

export default inject("stores")(observer(
  compose(
    withNavigationFocus,
    graphql(gql(listAllEvents), {
      alias,
      options: props => {
        const skipBaseQuery = props.stores.deltaSync.skipBaseQuery;
        const isConnected = props.stores.appState.isConnected;
        return {
          fetchPolicy: (!skipBaseQuery && isConnected) ? 'cache-and-network' : 'cache-first',
          notifyOnNetworkStatusChange: true,
          variables: {
            filter: filterEvents
          },
          onCompleted: () => {
            !skipBaseQuery && props.stores.deltaSync.updateBaseLastSyncTimestamp();
          },
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
        onRefresh: () =>  data.refetch(),
        fetchMore: () => data.fetchMore({
          query: gql(listAllEventsDelta),
          variables: {
            lastSync: ownProps.stores.deltaSync.lastSync
          },
          updateQuery: (prev, { fetchMoreResult: { listAllEventsDelta } }) => {
            if (!(listAllEventsDelta && listAllEventsDelta.items.length)) return prev;
            const { items } = listAllEventsDelta;
            
            const { listAllEvents } = prev;
            ownProps.stores.notifications.addToQueue(items, 'event', listAllEvents.items);

            const deleteIds = items.filter(item => item.aws_ds === 'DELETE').map(item => item.id);

            const filter_deleted_items = listAllEvents.items.filter(item => !deleteIds.includes(item.id));

            const remove_aws_ds_field = items.map(item => {
              const newItem = Object.assign({}, item);
              delete newItem.aws_ds;
              delete newItem.timestamp;
              return newItem;
            }).filter(item => !deleteIds.includes(item.id));

            const new_items = eventsDiff(remove_aws_ds_field, filter_deleted_items);

            const new_items_ids = new_items.map(item => item.id);

            const filter_changed_items = filter_deleted_items.filter(item => !new_items_ids.includes(item.id))

            const add_new_items_to_prev = [...filter_changed_items, ...new_items];
  
            ownProps.stores.deltaSync.updateLastSyncTimestamp();
            return Object.assign({}, prev, {
              listAllEvents: Object.assign({}, listAllEvents, {
                items: add_new_items_to_prev
              })
            });
          }
        }),
        ...ownProps
      })
    }),
  )(Events)
));