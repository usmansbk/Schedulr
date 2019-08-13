import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import Screen from './Schedule';
import { getSchedule } from 'api/queries';

const alias = 'withScheduleContainer';

export default compose(
  withNavigationFocus,
  graphql(gql(getSchedule), {
    alias,
    options: props => ({
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      variables: {
        id: props.id
      },
    }),
    props: ({ data, ownProps}) => ({
      loading: data.loading || data.networkStatus === 4,
      error: data.error,
      onRefresh: () => data.refetch(),
      schedule: data && data.getSchedule,
      ...ownProps
    }) 
  })
)(Screen);