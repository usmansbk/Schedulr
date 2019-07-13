import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { getEvent } from 'mygraphql/queries';

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
  })},
  props: ({ data, ownProps }) => ({
    loading: data.loading || data.networkStatus === 4,
    error: data.error,
    onRefresh: () =>  data.refetch(),
    event: data && data.getEvent,
    ...ownProps,
  })
})(Screen)