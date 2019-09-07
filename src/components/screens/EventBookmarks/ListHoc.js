import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import List from 'components/lists/People';
import { listBookmarks } from 'api/queries';
import { PAGINATION_LIMIT } from 'lib/constants';
import updateQuery from 'helpers/updateQuery';

const alias = 'withEventBookmarks';

export default graphql(gql(listBookmarks), {
  alias,
  options: props => ({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: props.id,
      limit: PAGINATION_LIMIT
    },
    fetchPolicy: 'cache-and-network'
  }),
  props: ({ data, ownProps }) => ({
    people: (data && data.listBookmarks && data.listBookmarks.bookmarks.items) || [],
    nextToken: data && data.listBookmarks && data.listBookmarks.bookmarks.nextToken,
    loading: data && data.loading || (data.networkStatus === 4),
    error: data.error,
    onRefresh: () => data.refetch(),
    fetchMore: (nextToken) => data.fetchMore({
      variables: {
        nextToken
      },
      updateQuery: (prev, { fetchMoreResult }) => (
        updateQuery({
          prev,
          fetchMoreResult,
          rootField: 'listBookmarks',
          connectionField: 'bookmarks'
        })
      ),
    }),
    ...ownProps
  })
})(List);