import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { createEvent } from '../../../graphql/mutations';
import { listAllEvents, listAllBoards, getEvent, getBoard } from '../../../graphql/queries';
import { createEventResponse } from '../../../helpers/optimisticResponse';

const alias =  'withNewEventContainer';

export default compose(
  graphql(gql(getBoard), {
    alias,
    options: props => {
      const id = props.navigation.getParam('boardId');
      return ({
        variables: {
          id,
        },
        fetchPolicy: 'cache-only'
      });
    },
    props: ({ data, ownProps }) => ({
      boardId: data && data.getBoard && data.getBoard.id,
      ...ownProps,
    }),
    skip: props => {
      const id = props.navigation.getParam('boardId');
      return !id;
    }
  }),
  graphql(gql(getEvent), {
    alias,
    options: props => {
      const id = props.navigation.getParam('id');
      return ({
        variables: {
          id
        },
        fetchPolicy: 'cache-only'
      });
    },
    props: ({ data, ownProps }) => ({
      event: data && data.getEvent,
      ...ownProps
    }),
    skip: props => {
      const id = props.navigation.getParam('id');
      return !id;
    }
  }),
  graphql(gql(createEvent), {
    alias,
    props: ({ mutate, ownProps }) => ({
      onSubmit: async (input) =>  await mutate({
        variables: {
          input
        },
        optimisticResponse: () => createEventResponse(input),
        update: (cache, { data: { createEvent } }) => {
          const query = gql(listAllEvents);
          data.listAllEvents.items = [
            ...data.listAllEvents.items.filter(item => item.id !== createEvent.id),
          ];
          cache.writeQuery({ query, data });
        }
      }),
      ...ownProps
    })
  }),
  graphql(gql(listAllBoards), {
    alias,
    options: {
      fetchPolicy: 'cache-only',
    },
    props: ({ data, ownProps }) => ({
      boards: data && data.listAllBoards && data.listAllBoards.items,
      ...ownProps
    })
  })
)(Screen);