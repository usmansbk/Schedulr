import { graphql, compose } from 'react-apollo';
import SimpleToast from 'react-native-simple-toast';
// import { Analytics } from 'aws-amplify';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import Events from './Events';
import { listAllEvents } from '../../../graphql/queries';

export default compose(
  withNavigationFocus,
  graphql(gql(listAllEvents), {
    alias: 'withEventsContainer',
    options: {
      fetchPolicy: 'cache-and-network',
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
        } catch(e) {
          SimpleToast.show(e.message, SimpleToast.SHORT);
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