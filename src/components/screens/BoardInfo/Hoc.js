import { graphql } from 'react-apollo';
import SimpleToast from 'react-native-simple-toast';
import gql from 'graphql-tag';
import logger, { analytics } from 'config/logger';
import Info from './Info';
import { getBoard } from 'mygraphql/queries';

const alias = 'withBoardInfoContainer';

export default graphql(gql(getBoard), {
  alias,
  options: props => ({
    variables: {
      id: props.id,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
    onError: error => {
      SimpleToast.show('Failed to get group', SimpleToast.SHORT);
      logger.debug(error.message);
      analytics({
        alias,
        name: 'get_board_info',
        error
      });
    }
  }),
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
    board: data && data.getBoard,
    ...ownProps,
  })
})(Info)