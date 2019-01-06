import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation } from 'react-navigation';
import Dialog from './Dialog';
import { listAllBoards } from '../../../graphql/queries';
import { deleteBoard } from '../../../graphql/mutations';

export default compose(
  withNavigation,
  graphql(gql(deleteBoard), {
    alias: 'withDeleteBoardDialog',
    props: ({ mutate, ownProps }) => ({
      onSubmit: async (input) => await mutate({
        variables: {
          input
        },
        optimisticResponse: () => ({
          __typename: 'Mutation',
          deleteBoard: {
            __typename: 'Board',
            id: input.id
          }
        }),
        update: (cache, { data: { deleteBoard } }) => {
          const query = gql(listAllBoards);
          const data = cache.readQuery({ query });
          data.listAllBoards.items = data.listAllBoards.items.filter(item => item.id !== deleteBoard.id);
          cache.writeQuery({ query, data });
        }
      }),
      ...ownProps
    })
  })
)(Dialog);