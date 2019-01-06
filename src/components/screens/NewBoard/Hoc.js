import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { createBoard } from '../../../graphql/mutations';
import { listAllBoards } from '../../../graphql/queries';
import { createBoardResponse } from '../../../helpers/optimisticResponse';

const alias =  'withNewBoardContainer';

export default graphql(gql(createBoard), {
  alias,
  props: ({ mutate, ownProps }) => ({
    onSubmit: async (input) =>  await mutate({
      variables: {
        input
      },
      optimisticResponse: () => createBoardResponse(input),
      update: (cache, { data: { createBoard } }) => {
        const query = gql(listAllBoards);
        const data = cache.readQuery({ query });
        data.listAllBoards.items = [
          ...data.listAllBoards.items.filter(item => item.id !== createBoard.id),
          createBoard
        ];
        cache.writeQuery({ query, data });
      }
    }),
    ...ownProps
  })
})(Screen);