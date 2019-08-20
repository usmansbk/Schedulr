import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import { getUserData } from 'api/queries';
import { baseEventsFilter } from 'api/filters';
import Events from './Events';

const alias = 'withEventsContainer';

export default (
  compose(
    withNavigationFocus,
    graphql(gql(getUserData), {
      alias,
      options: props => ({
        fetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
        variables: {
          id: props.id,
          filter: baseEventsFilter(moment().toISOString())
        }
      }),
      props: ({ data, ownProps}) => ({
        loading: data && data.loading || data.networkStatus === 4,
        data: data && data.getUserData,
        onRefresh: () => data.refetch(),
        ...ownProps
      })
    }),
  )(Events)
);