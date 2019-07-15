import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import gql from 'graphql-tag';
import Events from './Events';
import { listAllEvents } from 'mygraphql/queries';
import { listAllEventsDelta } from 'mygraphql/deltasync';

const alias = 'withEventsContainer';

const intervals = ["DAILY", "WEEKDAYS", "WEEKLY", "MONTHLY", "MONTHLY_DAY", "YEARLY"];

const filter = {
  "expression":  "#endAt >= :startOfDay OR ( (#repeat IN (:intervals) AND #untilAt >= :startOfDay) OR #forever = :forever ) AND #isCancelled = :isCancelled",
  "expressionNames": JSON.stringify({
    "#endAt"       : "endAt",
    "#repeat"      : "repeat",
    "#untilAt"     : "untilAt",
    "#forever"     : "forever",
    "#isCancelled" : "isCancelled"
  }),
  "expressionValues" :  JSON.stringify({
    ":startOfDay"    : moment().startOf('D').milliseconds(),
    ":intervals"     : `${intervals}`,
    ":forever"       : true,
    ":isCancelled"   : false
  })
}

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
            filter
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
          updateQuery: (prev, { fetchMoreResult }) => {
            ownProps.stores.deltaSync.updateLastSyncTimestamp();
            if (!fetchMoreResult.listAllEventsDelta) return prev;
            const { listAllEventsDelta } = fetchMoreResult;
            return Object.assign({}, prev, {
              listAllEvents: Object.assign({}, prev.listAllEvents, {
                items: [...prev.items, ...listAllEventsDelta.items]
              })
            });
          }
        }),
        ...ownProps
      })
    }),
  )(Events)
));