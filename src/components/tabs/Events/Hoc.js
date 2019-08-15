import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import gql from 'graphql-tag';
import { getUserData } from 'api/queries';
import Events from './Events';

const alias = 'withEventsContainer';

export default inject("stores")(observer(
  compose(
    withNavigationFocus,
    graphql(gql(getUserData), {
      alias,
      options: props => ({
        fetchPolicy: 'cache-first',
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