import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { createBoard } from '../../../graphql/mutations';

const alias =  'withNewBoardContainer';

export default graphql(gql(createBoard), {
  alias,
  props: ({ mutate, ownProps }) => ({
    onSubmit: async (input) =>  await mutate({
      variables: {
        input
      }
    }),
    ...ownProps
  })
})(Screen);