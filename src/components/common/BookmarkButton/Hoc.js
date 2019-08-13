import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { createBookmark, deleteBookmark } from 'api/mutations';
import Button from './Button';

export default inject("stores")(observer(
  compose(
    graphql(gql(createBookmark), {
      alias: 'withBookmarkEvent',
      props: ({ mutate, ownProps }) => ({
        onBookmarkEvent: (input) => mutate({
          variables: {
            input
          },
        }),
        ...ownProps
      }),
    }),
    graphql(gql(deleteBookmark), {
      alias: 'withUnbookmarkEvent',
      props: ({ mutate, ownProps }) => ({
        onUnbookmarkEvent: (input) => mutate({
          variables: {
            input
          },
        }),
        ...ownProps
      }),
    })
  )(Button)
));