import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { listEventComments } from 'mygraphql/queries';
import { deleteComment } from 'mygraphql/mutations';
import { deleteCommentResponse } from '../../../helpers/optimisticResponse';

export default graphql(gql(deleteComment), {
  props: ({ mutate, ownProps }) => ({
    onDelete: async () => await mutate({
      variables: {
        input: {
          id: ownProps.id
        }
      },
      update: (cache, { data: { deleteComment } }) => {
        if (deleteComment) {
          const query = gql(listEventComments);
          const data = cache.readQuery({ query, variables: { id: ownProps.eventId } });
          data.listComments.items = data.listComments.items.filter(item => item.id !== deleteComment.id);
          cache.writeQuery({ query, data });
        }
      },
      optimisticResponse: () => deleteCommentResponse({ id: ownProps.id, eventId: ownProps.eventId }),
    }),
    ...ownProps
  })
})(Dialog);