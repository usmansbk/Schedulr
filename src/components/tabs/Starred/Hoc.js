import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Starred from './Starred';
import { listAllEvents } from '../../../graphql/queries';

export default graphql(gql(listAllEvents), {
  options: {
    fetchPolicy: 'cache-only',
  },
  props: ({ data, ownProps }) => ({
    error: data.error,
    loading: data.loading,
    events: data && data.listAllEvents && data.listAllEvents.items.filter(item => item.isStarred) || [],
    onRefresh: async () => {
      try {
        await data.refetch();
      } catch (e) {

      }
    },
    ...ownProps
  })
})(Starred);