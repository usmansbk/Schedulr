import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { withNavigationFocus } from 'react-navigation';
import { getUserData, getUserDelta } from 'api/queries';
import { baseEventsFilter, deltaEventsFilter } from 'api/filters';
import updateBaseCache from 'helpers/deltaSync';
import Events from './Events';

const alias = 'withEventsContainer';
const BaseQuery = gql(getUserData);
const DeltaQuery = gql(getUserDelta);

export default inject("stores")(observer(
  compose(
    withNavigationFocus,
    graphql(BaseQuery, {
      alias,
      options: props => ({
        fetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
        variables: {
          id: props.id,
          filter: baseEventsFilter()
        }
      }),
      props: ({ data, ownProps}) => ({
        loading: data && (data.loading || data.networkStatus === 4),
        data: data && data.getUserData,
        onRefresh: () => data.refetch(),
        fetchMore: () => {
          const lastSyncTimestamp = ownProps.stores.appState.lastSyncTimestamp;
          data.fetchMore({
            query: DeltaQuery,
            variables:{
              id: ownProps.id,
              filter: deltaEventsFilter(lastSyncTimestamp)
            },
            updateQuery: (prev, { fetchMoreResult }) => (
              updateBaseCache({
                prev,
                fetchMoreResult,
                stores: ownProps.stores
              })
            )
          })
        },
        ...ownProps
      })
    }),
  )(Events)
));