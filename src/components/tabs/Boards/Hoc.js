import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import Schedules from './Schedules';
import { listAllSchedules } from 'mygraphql/queries';

const alias = 'withSchedulesContainer';
const BaseQuery = gql(listAllSchedules);

export default inject("stores")(observer(
  compose(
    withNavigationFocus,
    graphql(BaseQuery,
    {
      alias,
      options: {
        fetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
      },
      props: ({ data, ownProps}) => ({
        loading: data.loading || data.networkStatus === 4,
        boards: data && data.listAllSchedules && data.listAllSchedules.items || [],
        error: data.error && !data.listAllSchedules,
        onRefresh: () => data.refetch(),
        ...ownProps
      })
    })
  )(Schedules)
));