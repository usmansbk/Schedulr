import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import Schedules from './Schedules';
import { getUserData } from 'api/queries';

const alias = 'withSchedulesContainer';
const BaseQuery = gql(getUserData);

export default inject("stores")(observer(
  compose(
    withNavigationFocus,
    graphql(BaseQuery,
    {
      alias,
      options: props => ({
        fetchPolicy: 'cache-only',
        variables : {
          id: props.stores.appState.userId
        }
      }),
      props: ({ data, ownProps}) => ({
        data: data && data.getUserData,
        ...ownProps
      })
    })
  )(Schedules)
));