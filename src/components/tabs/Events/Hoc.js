import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import Events from './Events';
import { listAllEvents } from 'mygraphql/queries';

const alias = 'withEventsContainer';

export default compose(
  withNavigationFocus,
  graphql(gql(listAllEvents), {
    alias,
    options: {
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
    },
    props: ({ data, ownProps}) => ({
      loading: data.loading || data.networkStatus === 4,
      events: data && data.listAllEvents && data.listAllEvents.items || [],
      nextToken: data && data.listAllEvents && data.listAllEvents.nextToken,
      error: data.error && !data.listAllEvents,
      onRefresh: () =>  data.refetch(),
      ...ownProps
    })
  })
)(Events);