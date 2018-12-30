import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Info from './Info';
import { getBoard } from '../../../graphql/queries';

export default graphql(gql(getBoard), {
  options: props => ({
    variables: {
      id: props.id,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first'
  }),
  props: ({ data, ownProps }) => ({
    loading: data.loading || data.networkStatus === 4,
    error: data.error,
    onRefresh: () => data.refetch(),
    board: data && data.getBoard,
    ...ownProps,
  })
})(Info)