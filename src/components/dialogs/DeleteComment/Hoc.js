import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { deleteComment } from 'api/mutations';
import updateApolloCache from 'helpers/updateApolloCache';
import Dialog from './Dialog';
import buildOptimisticResponse from 'helpers/optimisticResponse';

export default graphql(gql(deleteComment), {
  props: ({ mutate, ownProps }) => ({
    onDelete: () => mutate({
      variables: {
        input: {
          id: ownProps.id
        }
      },
      update: (cache, { data: { deleteComment } }) => (
        updateApolloCache(cache, deleteComment, "DELETE")
      ),
      optimisticResponse: buildOptimisticResponse({
        input: { id: ownProps.id },
        mutationName: 'deleteComment',
        responseType: 'Comment',
        operationType: 'DELETE'
      })
    }),
    ...ownProps
  })
})(Dialog);