import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { cancelEvent } from '../../../graphql/mutations';

export default graphql(gql(cancelEvent), {
  alias: 'withCancelDialog',
  props: ({ mutate, ownProps }) => ({
    onSubmit: async (input) => await mutate({
      variables: {
        input
      }
    }),
    ...ownProps
  })
})(Dialog);