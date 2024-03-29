import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getSchedule } from 'api/queries';
import Info from './Info';

const alias = 'withScheduleInfoContainer';

export default graphql(gql(getSchedule), {
  alias,
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
    schedule: data && data.getSchedule,
    ...ownProps,
  })
})(Info)