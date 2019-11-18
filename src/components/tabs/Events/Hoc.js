import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigationFocus } from 'react-navigation';
import { getUserData } from 'api/queries';
import { baseEventsFilter } from 'api/filters';
import Events from './Events';

const alias = 'withEventsContainer';
const BaseQuery = gql(getUserData);

export default compose(
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
      data: data && data.getUserData,
      onRefresh: () => data.refetch({
        id: ownProps.id,
        filter: baseEventsFilter(),
        limit: 50
      }),
      ...ownProps
    })
  }),
)(Events);