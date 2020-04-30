import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { getUser, getEventComments } from 'api/queries';
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
        user: data && (data.getUser || {}) ,
        commentEventId: ownProps.navigation.getParam('id'),
        ...ownProps
      })
    }),
    graphql(gql(getEventComments), {
      alias: 'withGetEventCommentsScreenContainer',
      options: props => ({
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
        variables: {
          id: props.navigation.getParam('id'),
          limit: PAGINATION_LIMIT
        },
      }),
      props: ({ data, ownProps }) => ({
        loading: data && (data.loading || data.networkStatus === 4 || data.networkStatus === 3),
        notFound: !(data && data.getEventComments) && !data.error,
        error: data && data.error,
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
              rootField: 'getEventComments',
              connectionField: 'comments'
            })
          )
        }),
        isOwner: data && data.getEventComments&& data.getEventComments.isOwner,
        commentScheduleId: data && data.getEventComments && data.getEventComments.schedule && data.getEventComments.schedule.id,
        comments: (data && data.getEventComments && data.getEventComments.comments && data.getEventComments.comments.items) || [],
        nextToken: data && data.getEventComments && data.getEventComments.comments && data.getEventComments.comments.nextToken,
        ...ownProps
      })
    }),
    graphql(gql(createComment), {
      alias: 'withCreateCommentScreenContainer',
      props: ({ mutate, ownProps }) => ({
        onSubmit: (input) => mutate({
          variables: {
            input
          },
          update: (cache, { data: { createComment } }) => (
            updateApolloCache(
              cache,
              createComment,
              ADD,
              {
                commentEventId: ownProps.navigation.getParam('id')
              }
            )
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