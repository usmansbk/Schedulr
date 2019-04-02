import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import Starred from './Starred';
import { listAllEvents } from 'mygraphql/queries';

export default compose(
  withNavigationFocus,
  graphql(gql(listAllEvents), {
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
  })
)(Starred);