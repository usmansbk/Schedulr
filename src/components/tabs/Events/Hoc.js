import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import gql from 'graphql-tag';
import Events from './Events';

import { getUserData } from 'api/queries';

const alias = 'withEventsContainer';
const BaseQuery = gql(getUserData);

export default inject("stores")(observer(
  compose(
    withNavigationFocus,
    graphql(BaseQuery, {
      alias,
      options: props => ({
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
        variables: {
          id: props.stores.appState.userId
        }
      }),
      props: ({ data, ownProps}) => ({
        loading: data.loading || data.networkStatus === 4,
        data: data && data.getUserData,
        error: data.error,
        onRefresh: () =>  data.refetch(),
        ...ownProps
      })
    }),
  )(Events)
));