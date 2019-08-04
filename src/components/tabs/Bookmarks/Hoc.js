import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import Bookmarks from './Bookmarks';
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
      events: data && data.listAllEvents && data.listAllEvents.items.filter(item => item.isBookmarked) || [],
      onRefresh: async () => await data.refetch(),
      ...ownProps
    })
  })
)(Bookmarks);