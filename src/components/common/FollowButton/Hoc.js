import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import uniqWith from 'lodash.uniqwith';
import Button from './Button';
import { followBoard, unfollowBoard } from '../../../graphql/mutations';
import { listAllBoards, listAllEvents, listBoardEvents } from '../../../graphql/queries';
import {
  followBoardResponse,
  unfollowBoardResponse
} from '../../../helpers/optimisticResponse';
import client from '../../../config/client';
import SimpleToast from 'react-native-simple-toast';

const _filter = (a, b) => a.id === b.id;

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

            client.query({
              query: gql(listBoardEvents),
              variables: {
                id: followBoard.id
              }
            }).then(data => {
              const items =(
                data && data.data &&
                data.data.listBoardEvents &&
                data.data.listBoardEvents.events &&
                data.data.listBoardEvents.events.items || []
              );
              const allEventsQuery = gql(listAllEvents);
              const allEventsData = cache.readQuery({ query: allEventsQuery });
              allEventsData.listAllEvents.items = uniqWith([...allEventsData.listAllEvents.items, ...items], _filter);
              cache.writeQuery({ query: allEventsQuery, data: allEventsData });
            }).catch(e => {
              SimpleToast.show('Failed to add board events. Refresh all events!', SimpleToast.SHORT);
            });
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