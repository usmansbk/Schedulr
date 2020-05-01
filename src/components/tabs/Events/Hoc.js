import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getUserData } from 'api/queries';
import { baseEventsFilter } from 'api/filters';
import Events from './Events';

const alias = 'withEventsContainer';
const BaseQuery = gql(getUserData);

export default graphql(BaseQuery, {
  alias,
  options: () => ({
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      filter: baseEventsFilter(),
      limit: 50
    }
  }),
  props: ({ data, ownProps}) => ({
    loading: data && (data.loading || data.networkStatus === 4),
    data: data && data.getUserData,
    onRefresh: () => data.refetch({
      filter: baseEventsFilter(),
      limit: 50
    }),
    ...ownProps
  })
})(Events);