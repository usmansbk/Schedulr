import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { getUserBookmarks } from 'api/queries';
import Bookmarks from './Bookmarks';
import updateQuery from 'helpers/updateQuery';

const alias = 'withBookmarksContainer';

export default inject("stores")(observer(
  compose(
    withNavigationFocus,
    graphql(gql(getUserBookmarks),
    {
      alias,
      options: props => ({
        fetchPolicy: 'cache-first',
        variables : {
          id: props.stores.appState.userId
        },
        notifyOnNetworkStatusChange: true
      }),
      props: ({ data, ownProps}) => ({
        data: data && data.getUserBookmarks,
        nextToken: data && data.getUserBookmarks && data.getUserBookmarks.bookmarks && data.getUserBookmarks.bookmarks.nextToken,
        loading: data && (data.loading || data.networkStatus === 4 || data.networkStatus === 3),
        onRefresh: () => data.refetch(),
        fetchMore: (nextToken) => data.fetchMore({
          variables: {
            nextToken,
            limit: 50
          },
          updateQuery: (prev, { fetchMoreResult }) => (
            updateQuery({
              prev,
              fetchMoreResult,
              rootField: 'getUserBookmarks',
              connectionField: 'bookmarks'
            })
          )
        }),
        ...ownProps
      })
    })
  )(Bookmarks)
));