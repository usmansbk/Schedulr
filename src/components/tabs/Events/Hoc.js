import { graphql, compose } from 'react-apollo';
import SimpleToast from 'react-native-simple-toast';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import Events from './Events';
import { listAllEvents } from 'mygraphql/queries';
import logger, { analytics } from 'config/logger';

const alias = 'withEventsContainer';

export default compose(
  withNavigationFocus,
  graphql(gql(listAllEvents), {
    alias,
    options: {
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      onError: error => {
        SimpleToast.show('Failed to fetch updates', SimpleToast.SHORT);
        logger.debug(error.message);
        analytics({
          name: 'list_all_events',
          alias,
          error
        });
      }
    },
    props: ({ data, ownProps}) => ({
      loading: data.loading || data.networkStatus === 4,
      events: data && data.listAllEvents && data.listAllEvents.items || [],
      nextToken: data && data.listAllEvents && data.listAllEvents.nextToken,
      error: data.error && !data.listAllEvents,
      onRefresh: async () => {
        try {
          await data.refetch();
        } catch (error) {
          logger.debug(error.message);
        }
      },
      ...ownProps
    })
  })
)(Events);