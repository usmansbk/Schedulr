import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
// import { I18n } from 'aws-amplify';
// import SimpleToast from 'react-native-simple-toast';
import { withNavigationFocus } from 'react-navigation';
import { getUserData, getDeltaUpdates } from 'api/queries';
import { baseEventsFilter } from 'api/filters';
import updateBaseQuery from 'helpers/deltaSync';
import Events from './Events';

const alias = 'withEventsContainer';
const BaseQuery = gql(getUserData);
const DeltaQuery = gql(getDeltaUpdates);

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
          filter: baseEventsFilter(),
          limit: 50
        }
      }),
      props: ({ data, ownProps}) => ({
        loading: data && (data.loading || data.networkStatus === 4),
        fetchingMore: data && data.networkStatus === 3,
        data: data && data.getUserData,
        userId: ownProps.stores.appState.userId,
        onRefresh: () => data.refetch({
          id: ownProps.id,
          filter: baseEventsFilter(),
          limit: 50
        }),
        fetchMore: () => {
          // SimpleToast.show(I18n.get('TOAST_fetchingUpdates'), SimpleToast.SHORT);
          const lastSyncTimestamp = ownProps.stores.appState.lastSyncTimestamp;
          data.fetchMore({
            query: DeltaQuery,
            variables:{
              lastSync: String(lastSyncTimestamp)
            },
            updateQuery: (prev, { fetchMoreResult }) => (
              updateBaseQuery({
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