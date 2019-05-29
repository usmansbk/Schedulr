import { graphql } from 'react-apollo';
import { Analytics } from 'aws-amplify';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import Screen from './Screen';
import { getEvent } from 'mygraphql/queries';
import logger, { analytics } from 'config/logger';

const alias = 'withEventDetails';

export default graphql(gql(getEvent), {
  alias,
  options: props => {
    const id = props.navigation.getParam('id');
    return ({
    variables: {
      id,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
    onError: error => {
      SimpleToast.show('Failed to get event', SimpleToast.SHORT);
      logger.debug(error.message);
      analytics({
        alias,
        name: 'get_event',
        error
      });
    }
  })},
  props: ({ data, ownProps }) => ({
    loading: data.loading || data.networkStatus === 4,
    error: data.error,
    onRefresh: async () => {
      try {
        await data.refetch();
      } catch (error) {
        logger.debug(error.message);
      }
    },
    event: data && data.getEvent,
    ...ownProps,
  })
})(Screen)