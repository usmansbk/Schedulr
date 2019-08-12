import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { getUserSchedules } from 'api/queries';
import Schedules from './Schedules';

const alias = 'withSchedulesContainer';

export default inject("stores")(observer(
  compose(
    withNavigationFocus,
    graphql(gql(getUserSchedules),
    {
      alias,
      options: props => ({
        fetchPolicy: 'cache-only',
        variables : {
          id: props.stores.appState.userId
        }
      }),
      props: ({ data, ownProps}) => ({
        data: data && data.getUserSchedules,
        ...ownProps
      })
    })
  )(Schedules)
));