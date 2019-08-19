import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { createFollow, deleteFollow } from 'api/mutations';
import updateApolloCache from 'helpers/updateApolloCache';
import buildOptimisticResponse from 'helpers/optimisticResponse';
import { ADD, DELETE } from 'lib/constants';
import Button from './Button';

export default inject("stores")(observer(
  compose(
    graphql(gql(createFollow), {
      alias: 'withCreateFollow',
      props: ({ mutate, ownProps }) => ({
        ...ownProps,
        follow: (input) => mutate({
          variables: {
            input
          },
          update: (cache, { data: { createFollow } }) => createFollow && (
            updateApolloCache(cache, createFollow, ADD)
          ),
          optimisticResponse: buildOptimisticResponse({
            input,
            mutationName: 'createFollow',
            operationType: ADD,
            responseType: 'Follow'
          })
        })
      })
    }),
    graphql(gql(deleteFollow), {
      alias: 'withDeleteFollow',
      props: ({ mutate, ownProps }) => ({
        ...ownProps,
        unfollow: (input, id) => mutate({
          variables: {
            input
          },
          update: (cache, { data: { deleteFollow } }) => deleteFollow && (
            updateApolloCache(cache, deleteFollow, DELETE)
          ),
          optimisticResponse: buildOptimisticResponse({
            input: {
              ...input,
              followScheduleId: id
            },
            mutationName: 'deleteFollow',
            operationType: DELETE,
            responseType: 'Follow'
          })
        })
      })
    })
  )(Button)
 ));