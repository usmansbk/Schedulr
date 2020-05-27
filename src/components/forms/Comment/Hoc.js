import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { createComment } from 'api/mutations';
import updateApolloCache from 'helpers/updateApolloCache';
import Container from './Container';
import buildOptimisticResponse from 'helpers/optimisticResponse';
import { ADD, COMMENT_TYPE } from 'lib/constants';

export default inject("stores")(observer(
  graphql(gql(createComment), {
    alias: 'withCreateCommentContainer',
    withRef: true,
    props: ({ mutate, ownProps }) => ({
      onSubmit: (input) => mutate({
        variables: {
          input
        },
        update: (cache, { data: { createComment } }) => (
          updateApolloCache(cache, createComment, ADD, {
            commentEventId: ownProps.commentEventId
          })
        ),
        optimisticResponse: buildOptimisticResponse({
          input,
          mutationName: 'createComment',
          responseType: COMMENT_TYPE,
          operationType: ADD
        })
      }),
      ...ownProps
    })
  })(Container)
));