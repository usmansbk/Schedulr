import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Button from './Button';
import { followBoard, unfollowBoard } from '../../../graphql/mutations';
import { listAllBoards, listAllEvents, listBoardEvents } from '../../../graphql/queries';
import {
  followBoardResponse,
  unfollowBoardResponse
} from '../../../helpers/optimisticResponse';

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
        update: (cache, { data: { followBoard } }) => {
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

            const allEventsQuery = gql(listAllEvents);
            const allEventsData = cache.readQuery({ query: allEventsQuery });
            allEventsData.listAllEvents.items = allEventsData.listAllEvents.items.filter(item => item.board.id !== unfollowBoard.id);
            cache.writeQuery({ query: allEventsQuery, data: allEventsData });
          }
        },
        optimisticResponse: () => unfollowBoardResponse(ownProps.id)
      }),
      ...ownProps
    })
  }),
)(Button);