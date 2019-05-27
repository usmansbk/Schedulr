import { graphql, compose } from 'react-apollo';
import SimpleToast from 'react-native-simple-toast';
// import { Analytics } from 'aws-amplify';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import Events from './Events';
import { listAllEvents } from 'mygraphql/queries';

export default compose(
  withNavigationFocus,
  graphql(gql(listAllEvents), {
    alias: 'withEventsContainer',
    options: {
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
    },
    props: ({ data, ownProps}) => ({
      loading: data.loading || data.networkStatus === 4,
      events: data && data.listAllEvents && data.listAllEvents.items || [],
      nextToken: data && data.listAllEvents && data.listAllEvents.nextToken,
      error: data.error && !data.listAllEvents,
      onRefresh: async () => {
        try {
          await data.refetch()
        } catch(error) {
          SimpleToast.show(error.message, SimpleToast.SHORT);
          // Log error if it occurs multiple times
          // Analytics.record({
          //   name: e.name,
          //   attributes: {
          //     message: e.message,
          //     component: 'EventsContainer'
          //   }
          // })
        }
      },
      ...ownProps
    })
  })
)(Events);