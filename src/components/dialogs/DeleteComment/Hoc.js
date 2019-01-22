import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { listEventComments } from '../../../graphql/queries';
import { deleteComment } from '../../../graphql/mutations';

export default compose(
  graphql(gql(deleteComment), {
    options: props => ({ 
      variables: {
        input: {
          id: props.id
        }
      }, 
      update: (cache, { data: { deleteComment } }) => {
        if (deleteComment) {
          const query = gql(listEventComments);
          const data = cache.readQuery({ query });
          data.listEventComments.items = data.listEventComments.items.filter(item => item.id !== deleteComment.id);
          cache.writeQuery({ query, data });
        }
      },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        deleteComment: {
          __typename: 'Comment',
          id: props.id
        }
      }),
    }),
    props: ({ mutate, ownProps }) => ({
      onDelete: async () => await mutate(),
      ...ownProps
    })
  })
)(Dialog);