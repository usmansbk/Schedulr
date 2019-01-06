import { graphql } from 'react-apollo';
import { Analytics } from 'aws-amplify';
import gql from 'graphql-tag';
import Screen from './Screen';
import { getEvent } from '../../../graphql/queries';

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
    fetchPolicy: 'cache-first'
  })},
  props: ({ data, ownProps }) => ({
    loading: data.loading || data.networkStatus === 4,
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
            component: 'EventContainer'
          }
        })
      }
    },
    event: data && data.getEvent,
    ...ownProps,
  })
})(Screen)