import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Container from './NewBoard';
import { createBoard } from '../../../graphql/mutations';
import { listAllBoards } from '../../../graphql/queries';

export default graphql(gql(createBoard), {
  alias: 'NewBoardContainer',
  options: {
    refetchQueries: [{
      query: gql(listAllBoards)
    }],
    awaitRefetchQueries: true
  },
  props: ({ mutate, ownProps }) => ({
    onSubmit: async (input) =>  await mutate({
      variables: {
        input
      }
    }),
    ...ownProps
  })
})(Container);