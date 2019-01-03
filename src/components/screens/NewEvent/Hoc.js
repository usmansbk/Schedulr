import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { createEvent } from '../../../graphql/mutations';
import { listAllBoards, getEvent, getBoard } from '../../../graphql/queries';

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
    options: {
      refetchQueries: ['listEvents'],
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