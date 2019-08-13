import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Button from './Button';
import { createBookmark, deleteBookmark } from 'api/mutations';

export default compose(
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
)(Button);