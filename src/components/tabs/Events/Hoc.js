import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import gql from 'graphql-tag';
import differenceWith from 'lodash.differencewith';
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
        return {
          fetchPolicy: skipBaseQuery ? 'cache-first' : 'cache-and-network',
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
            ownProps.stores.deltaSync.updateLastSyncTimestamp();
            if (!listAllEventsDelta || !listAllEventsDelta.items.length) return prev;
            const { items } = listAllEventsDelta;
            const { listAllEvents } = prev;

            // get deleted ids
            const deletedIds = items.filter(item => item.aws_ds === 'DELETE').map(item => item.id);

            // filter deleted items from listAllEvents.items
            const filteredDeletedItems = listAllEvents.items.filter(item => !deletedIds.includes(item.id));

            // remove aws_ds field from listAllEventsDelta.items
            const removed_aws_ds_field = filteredDeletedItems.map(item => {
              const newItem = Object.assign({}, item);
              delete newItem.aws_ds;
              return newItem;
            });

            // get new items in listAllEventsDelta.items
            const new_items = differenceWith(listAllEvents.items, removed_aws_ds_field, (prev, next) => prev.id === next.id);

            // add new items to listAllEvents.items
            const added_new_items_to_prev = [...listAllEvents.items, ...new_items];
            
            return Object.assign({}, prev, {
              listAllEvents: Object.assign({}, prev.listAllEvents, {
                items: added_new_items_to_prev
              })
            });
          }
        }),
        ...ownProps
      })
    }),
  )(Events)
));