import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { openBoard } from '../../../graphql/mutations';

export default graphql(gql(openBoard), {
  alias: 'withOpenBoardDialog',
  props: ({ mutate, ownProps }) => ({
    onSubmit: async (input) => await mutate({
      variables: {
        input
      }
    }),
    ...ownProps
  })
})(Dialog);