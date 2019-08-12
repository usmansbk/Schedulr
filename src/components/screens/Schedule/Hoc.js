import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import Screen from './Schedule';
import { getScheduleWithEvents } from 'api/queries';

const alias = 'withScheduleEventsContainer';

export default compose(
  withNavigationFocus,
  graphql(gql(getScheduleWithEvents), {
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
      schedule: data && data.getSchedule,
      ...ownProps
    }) 
  })
)(Screen);