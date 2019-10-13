import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { nearbyEvents } from 'api/queries';
import List from 'components/lists/Discover';
import updateQuery from 'helpers/updateQuery';

const alias = 'withBookmarksContainer';

export default inject("stores")(observer(
  compose(
    withNavigationFocus,
    graphql(gql(nearbyEvents),
    {
      alias,
      options: props => ({
        fetchPolicy: 'cache-and-network',
        variables : {
          city: props.city,
          location: props.location,
          km: 5,
          limit: 50
        },
        notifyOnNetworkStatusChange: true
      }),
      skip: props => !props.location,
      props: ({ data, ownProps}) => ({
        data: data && data.nearbyEvents && data.nearbyEvents.items || [],
        nextToken: data && data.nearbyEvents && data.nearbyEvents.nextToken,
        loading: data && data.loading,
        refreshing: data.networkStatus === 4,
        onRefresh: () => data && data.refetch(),
        fetchMore: (nextToken) => data.fetchMore({
          variables: {
            nextToken,
            limit: 50
          },
          updateQuery: (prev, { fetchMoreResult }) => (
            updateQuery({
              prev,
              fetchMoreResult,
              rootField: 'nearbyEvents',
            })
          )
        }),
        ...ownProps
      })
    })
  )(List)
));