// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
import Dialog from './Dialog';
export default Dialog;
// import { listEventComments } from 'api/queries';
// import { deleteComment } from 'api/mutations';
// import { deleteCommentResponse } from 'helpers/optimisticResponse';

// export default graphql(gql(deleteComment), {
//   props: ({ mutate, ownProps }) => ({
//     onDelete: () => mutate({
//       variables: {
//         input: {
//           id: ownProps.id
//         }
//       },
//       update: (cache, { data: { deleteComment } }) => {
//         if (deleteComment) {
//           const query = gql(listEventComments);
//           const data = cache.readQuery({ query, variables: { id: ownProps.eventId } });
//           data.listComments.items = data.listComments.items.filter(item => item.id !== deleteComment.id);
//           cache.writeQuery({ query, data, variables: { id: ownProps.eventId } });
//         }
//       },
//       optimisticResponse: () => deleteCommentResponse({ id: ownProps.id, eventId: ownProps.eventId }),
//     }),
//     ...ownProps
//   })
// })(Dialog);