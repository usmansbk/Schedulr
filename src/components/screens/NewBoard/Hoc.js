import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Container from './NewBoard';
import { createBoard } from '../../../graphql/mutations';

export default graphql(gql(createBoard), {
  alias: 'NewBoardContainer',
  props: ({ mutate, ownProps }) => ({
    onSubmit: async (input) =>  await mutate({
      variables: {
        input
      }
    }),
    ...ownProps
  })
})(Container);