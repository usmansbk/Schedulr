import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation } from 'react-navigation';
import Dialog from './Dialog';
import { listAllBoards, listAllEvents } from 'mygraphql/queries';
import { deleteBoard } from 'mygraphql/mutations';

export default compose(
  withNavigation,
  graphql(gql(deleteBoard), {
    alias: 'withDeleteBoardDialog',
    props: ({ mutate, ownProps }) => ({
      onSubmit: (input) => mutate({
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
          if (deleteBoard) {
            const query = gql(listAllBoards);
            const data = cache.readQuery({ query });
            data.listAllBoards.items = data.listAllBoards.items.filter(item => item.id !== deleteBoard.id);

            const allEventsQuery = gql(listAllEvents);
            const allEventsData = cache.readQuery({ query: allEventsQuery });
            allEventsData.listAllEvents.items = data.listAllEvents.items.filter(item => item.board.id !== deleteBoard.id);

            cache.writeQuery({ query, data });
            cache.writeQuery({ query: allEventsQuery, data: allEventsData });
          }
        }
      }),
      ...ownProps
    })
  })
)(Dialog);