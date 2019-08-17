import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { deleteComment } from 'api/mutations';
import updateApolloCache from 'helpers/updateApolloCache';
import Dialog from './Dialog';

export default graphql(gql(deleteComment), {
  props: ({ mutate, ownProps }) => ({
    onDelete: () => mutate({
      variables: {
        input: {
          id: ownProps.id
        }
      },
      update: (cache, { data: { deleteComment } }) => deleteComment && (
        updateApolloCache(cache, deleteComment, "DELETE")
      )
    }),
    ...ownProps
  })
})(Dialog);