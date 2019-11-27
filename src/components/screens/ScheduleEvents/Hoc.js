import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { getSchedule } from 'api/queries';
import ScheduleEvents from './ScheduleEvents';

const alias = 'withScheduleEventsContainer';

export default inject("stores")(observer(
  graphql(gql(getSchedule), {
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
      loading: data && (data.loading || (data.networkStatus === 4) || (data.networkStatus === 3)),
      onRefresh: () => data.refetch(),
      schedule: data && data.getSchedule,
      ...ownProps,
    })
  })(ScheduleEvents)
))