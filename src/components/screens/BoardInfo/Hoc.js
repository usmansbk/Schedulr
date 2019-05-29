import { graphql } from 'react-apollo';
import SimpleToast from 'react-native-simple-toast';
import gql from 'graphql-tag';
import { analytics } from 'config/logger';
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
      SimpleToast.show('Failed to get calendar', SimpleToast.SHORT);
      analytics({
        component: alias,
        logType: 'getBoardQuery',
        error
      });
    }
  }),
  props: ({ data, ownProps }) => ({
    loading: data.loading || data.networkStatus === 4,
    error: data.error,
    onRefresh: async () => {
      await data.refetch();
    },
    board: data && data.getBoard,
    ...ownProps,
  })
})(Info)