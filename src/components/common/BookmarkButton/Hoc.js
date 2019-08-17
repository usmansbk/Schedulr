import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { createBookmark, deleteBookmark } from 'api/mutations';
import updateApolloCache from 'helpers/updateApolloCache';
import Button from './Button';
import buildOptimisticResponse from 'helpers/optimisticResponse';

export default inject("stores")(observer(
  compose(
    graphql(gql(createBookmark), {
      alias: 'withBookmarkEvent',
      props: ({ mutate, ownProps }) => ({
        bookmarkEvent: (input) => mutate({
          variables: {
            input
          },
          update: (cache, { data: { createBookmark } }) => createBookmark && (
            updateApolloCache(cache, createBookmark, "ADD")
          ),
          optimisticResponse: buildOptimisticResponse({
            input,
            mutationName: 'createBookmark',
            responseType: 'Bookmark',
            operationType: 'ADD'
          })
        }),
        ...ownProps
      }),
    }),
    graphql(gql(deleteBookmark), {
      alias: 'withRemoveBookmarkEvent',
      props: ({ mutate, ownProps }) => ({
        removeBookmark: (input) => mutate({
          variables: {
            input
          },
          update: (cache, { data: { deleteBookmark } }) => deleteBookmark && (
            updateApolloCache(cache, deleteBookmark, "DELETE")
          ),
          optimisticResponse: buildOptimisticResponse({
            input,
            mutationName: 'deleteBookmark',
            responseType: 'Bookmark',
            operationType: 'DELETE'
          })
        }),
        ...ownProps
      }),
    })
  )(Button)
));