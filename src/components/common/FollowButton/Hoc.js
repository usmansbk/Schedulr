import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { createFollow, deleteFollow } from 'api/mutations';
import updateApolloCache from 'helpers/updateApolloCache';
import buildOptimisticResponse from 'helpers/optimisticResponse';
import { ADD, DELETE } from 'lib/constants';
import Button from './Button';
import { baseEventsFilter } from 'graphql/filters';

export default inject("stores")(observer(
  compose(
    graphql(gql(createFollow), {
      alias: 'withCreateFollow',
      withRef: true,
      props: ({ mutate, ownProps }) => ({
        ...ownProps,
        follow: (input) => mutate({
          variables: {
            input,
            filter: baseEventsFilter()
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
      withRef: true,
      props: ({ mutate, ownProps }) => ({
        ...ownProps,
        unfollow: (input, followScheduleId) => mutate({
          variables: {
            input
          },
          update: (cache, { data: { deleteFollow } }) => {
            let optimisticFollow = deleteFollow;
            if (!optimisticFollow) {
              const optimisticResponse = buildOptimisticResponse({
                input: {
                  ...input,
                  followScheduleId
                },
                mutationName: 'deleteFollow',
                operationType: DELETE,
                responseType: 'Follow'
              });
              optimisticFollow = optimisticResponse.deleteFollow;
            }
            updateApolloCache(cache, optimisticFollow, DELETE);
          },
          optimisticResponse: buildOptimisticResponse({
            input: {
              ...input,
              followScheduleId
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