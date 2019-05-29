import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import Logger, { analytics } from 'config/logger';
import { createBoard } from 'mygraphql/mutations';
import { listAllBoards } from 'mygraphql/queries';
import { createBoardResponse } from 'helpers/optimisticResponse';
import SimpleToast from 'react-native-simple-toast';

const alias =  'withNewBoardContainer';

export default graphql(gql(createBoard), {
  alias,
  options: {
    onError: error => {
      SimpleToast.show('Failed to create calendar', SimpleToast.SHORT);
      analytics({
        logType: 'createBoardMutation',
        component: alias,
        error
      });
      Logger.debug(error.message);
    }
  },
  props: ({ mutate, ownProps }) => ({
    onSubmit: async (input) =>  await mutate({
      variables: {
        input
      },
      optimisticResponse: () => createBoardResponse(input),
      update: (cache, { data: { createBoard } }) => {
        if (createBoard) {
          const query = gql(listAllBoards);
          const data = cache.readQuery({ query });
          data.listAllBoards.items = [
            ...data.listAllBoards.items.filter(item => item.id !== createBoard.id),
            createBoard
          ];
          cache.writeQuery({ query, data });
        }
      }
    }),
    ...ownProps
  })
})(Screen);