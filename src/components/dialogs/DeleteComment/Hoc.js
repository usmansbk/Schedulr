import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { deleteComment } from 'api/mutations';

export default graphql(gql(deleteComment), {
  props: ({ mutate, ownProps }) => ({
    onDelete: () => mutate({
      variables: {
        input: {
          id: ownProps.id
        }
      }
    }),
    ...ownProps
  })
})(Dialog);