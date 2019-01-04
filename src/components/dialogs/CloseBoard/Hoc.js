import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { closeBoard } from '../../../graphql/mutations';

export default graphql(gql(closeBoard), {
  alias: 'withCloseBoardDialog',
  props: ({ mutate, ownProps }) => ({
    onSubmit: async (input) => await mutate({
      variables: {
        input
      }
    }),
    ...ownProps
  })
})(Dialog);