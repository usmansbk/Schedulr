import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { deleteComment } from 'api/mutations';
import updateApolloCache from 'helpers/updateApolloCache';
import buildOptimisticResponse from 'helpers/optimisticResponse';
import { DELETE } from 'lib/constants';
import Dialog from './Dialog';

export default graphql(gql(deleteComment), {
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
})(Dialog);