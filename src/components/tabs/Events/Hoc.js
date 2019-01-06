import { graphql } from 'react-apollo';
import { Analytics } from 'aws-amplify';
import gql from 'graphql-tag';
import Events from './Events';
import { listAllEvents } from '../../../graphql/queries';

export default graphql(gql(listAllEvents), {
  alias: 'withEventsContainer',
  options: {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  },
  props: ({ data, ownProps}) => ({
    loading: data.loading || data.networkStatus === 4,
    events: data && data.listAllEvents && data.listAllEvents.items,
    nextToken: data && data.listAllEvents && data.listAllEvents.nextToken,
    error: data.error,
    onRefresh: async () => {
      try {
        await data.refetch()
      } catch(e) {
        console.log(e);
        // Log error if it occurs multiple times
        Analytics.record({
          name: e.name,
          attributes: {
            message: e.message,
            component: 'EventsContainer'
          }
        })
      }
    },
    ...ownProps
  })
})(Events);