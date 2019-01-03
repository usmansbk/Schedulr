import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { createBoard } from '../../../graphql/mutations';
import { listAllBoards } from '../../../graphql/queries';

const alias =  'withNewBoardContainer';

export default graphql(gql(createBoard), {
  alias,
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
})(Screen);