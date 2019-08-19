import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { getUser, getEventComments } from 'api/queries';
import { createComment } from 'api/mutations';
import updateApolloCache from 'helpers/updateApolloCache';
import Container from './Container';
import buildOptimisticResponse from 'helpers/optimisticResponse';
import { ADD } from 'lib/constants';

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
        ...ownProps
      })
    }),
    graphql(gql(getEventComments), {
      alias: 'withGetEventCommentsScreenContainer',
      options: props => ({
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
        variables: {
          id: props.navigation.getParam('id')
        },
      }),
      props: ({ data, ownProps }) => ({
        loading: data.loading || data.networkStatus === 4,
        error: data.error,
        onRefresh: () => data.refetch(),
        comments: data && data.getEventComments && data.getEventComments.comments.items || [],
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