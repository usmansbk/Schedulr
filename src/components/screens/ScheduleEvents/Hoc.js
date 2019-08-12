import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { getScheduleWithEvents } from 'api/queries';
import ScheduleEvents from './ScheduleEvents';

const alias = 'withScheduleEventsContainer';

export default inject("stores")(observer(
  graphql(gql(getScheduleWithEvents), {
    alias,
    options: props => ({
      variables: {
        id: props.id,
      },
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
    }),
    props: ({ data, ownProps }) => ({
      error: data.error,
      loading: data.loading || (data.networkStatus === 4),
      schedule: data && data.getSchedule,
      ...ownProps,
    })
  })(ScheduleEvents)
))