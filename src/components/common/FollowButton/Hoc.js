import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Button from './Button';
import { followBoard, unfollowBoard } from 'mygraphql/mutations';
import { listAllBoards } from 'mygraphql/queries';
import {
  followBoardResponse,
  unfollowBoardResponse
} from 'helpers/optimisticResponse';

export default compose(
  graphql(gql(followBoard), {
    alias: 'withFollowBoard',
    props: ({ mutate, ownProps }) => ({
      onFollowBoard: async () => await mutate({
        variables: {
          input: {
            id: ownProps.id
          }
        },
        update: async (cache, { data: { followBoard } }) => {
          if (followBoard) {
            const query = gql(listAllBoards);
            const data = cache.readQuery({ query });
            data.listAllBoards.items = [
              ...data.listAllBoards.items.filter(item => item.id !== followBoard.id),
              followBoard
            ];
            cache.writeQuery({ query, data });
          }
        },
        optimisticResponse: () => followBoardResponse(ownProps.id),
      }),
      ...ownProps
    })
  }),
  graphql(gql(unfollowBoard), {
    alias: 'withUnfollowBoard',
    props: ({ mutate, ownProps }) => ({
      onUnfollowBoard: async () => await mutate({
        variables: {
          input: {
            id: ownProps.id
          },
        },
        update: (cache, { data: { unfollowBoard } }) => {
          if (unfollowBoard) {
            const query = gql(listAllBoards);
            const data = cache.readQuery({ query });
            data.listAllBoards.items = data.listAllBoards.items.filter(item => item.id !== unfollowBoard.id);
            cache.writeQuery({ query, data });
          }
        },
        optimisticResponse: () => unfollowBoardResponse(ownProps.id)
      }),
      ...ownProps
    })
  }),
)(Button);