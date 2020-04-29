import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { getUser, getCommentThread } from 'api/queries';
import { createComment } from 'api/mutations';
import updateApolloCache from 'helpers/updateApolloCache';
import Container from './Container';
import buildOptimisticResponse from 'helpers/optimisticResponse';
import { ADD, PAGINATION_LIMIT } from 'lib/constants';
import updateQuery from 'helpers/updateQuery';

export default inject("stores")(observer(
  compose(
    graphql(gql(getUser), {
      alias: 'withCommentsUserScreenContainer',
      options: props => ({
        fetchPolicy: 'cache-only',
        variables: {
          id: props.stores.appState.userId
        }
      }),
      props: ({ data, ownProps }) => ({
        user: data && data.getUser,
        commentEventId: ownProps.navigation.getParam('id'),
        isThread: true,
        ...ownProps
      })
    }),
    graphql(gql(getCommentThread), {
      alias: 'withGetCommentThreadScreenContainer',
      options: props => ({
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
        variables: {
          id: props.navigation.getParam('commentToId'),
          limit: PAGINATION_LIMIT
        },
      }),
      props: ({ data, ownProps }) => ({
        loading: data && (data.loading || data.networkStatus === 4 || data.networkStatus === 3),
        error: data.error,
        onRefresh: () => data.refetch({
          nextToken: null
        }),
        fetchMore: (nextToken) => data.fetchMore({
          variables: {
            nextToken
          },
          updateQuery: (prev, { fetchMoreResult }) => (
            updateQuery({
              prev,
              fetchMoreResult,
              rootField: 'getCommentThread',
              connectionField: 'thread'
            })
          )
        }),
        commentScheduleId: data && data.getCommentThread && data.getCommentThread.schedule && data.getCommentThread.schedule.id,
        comments: (data && data.getCommentThread && data.getCommentThread.thread && data.getCommentThread.thread.items) || [],
        nextToken: data && data.getCommentThread && data.getCommentThread.thread && data.getCommentThread.thread.nextToken,
        ...ownProps
      })
    }),
    graphql(gql(createComment), {
      alias: 'withCreateCommentScreenContainer',
      props: ({ mutate, ownProps }) => ({
        onSubmit: (input) => mutate({
          variables: {
            input: {
              ...input,
              commentToId: ownProps.navigation.getParam('commentToId')
            }
          },
          update: (cache, { data: { createComment } }) => (
            updateApolloCache(cache, createComment, ADD)
          ),
          optimisticResponse: buildOptimisticResponse({
            input,
            mutationName: 'createComment',
            responseType: 'Comment',
            operationType: ADD
          })
        }),
        ...ownProps
      })
    }),
  )(Container)
));