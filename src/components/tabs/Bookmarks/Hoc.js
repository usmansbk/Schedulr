import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { getUserBookmarks } from 'api/queries';
import Bookmarks from './Bookmarks';

const alias = 'withBookmarksContainer';

export default inject("stores")(observer(
  compose(
    withNavigationFocus,
    graphql(gql(getUserBookmarks),
    {
      alias,
      options: props => ({
        fetchPolicy: 'cache-only',
        variables : {
          id: props.stores.appState.userId
        }
      }),
      props: ({ data, ownProps}) => ({
        data: data && data.getUserBookmarks,
        ...ownProps
      })
    })
  )(Bookmarks)
));