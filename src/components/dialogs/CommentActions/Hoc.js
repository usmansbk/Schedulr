import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {inject, observer } from 'mobx-react';
import { deleteComment } from 'api/mutations';
import updateApolloCache from 'helpers/updateApolloCache';
import buildOptimisticResponse from 'helpers/optimisticResponse';
import { DELETE } from 'lib/constants';
import Actions from './Actions';

export default inject("stores")(observer(
  graphql(gql(deleteComment), {
    withRef: true,
    props: ({ mutate, ownProps }) => ({
      onSubmit: () => mutate({
        variables: {
          input: {
            id: ownProps.id
          }
        },
        update: (cache, { data: { deleteComment } }) => (
          updateApolloCache(cache, deleteComment, DELETE, {
            commentEventId: ownProps.commentEventId
          })
        ),
        optimisticResponse: buildOptimisticResponse({
          input: { id: ownProps.id, eventId: ownProps.commentEventId },
          mutationName: 'deleteComment',
          responseType: 'Comment',
          operationType: DELETE
        })
      }),
      ...ownProps
    })
  })(Actions)
));