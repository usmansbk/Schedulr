import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { createEvent } from 'mygraphql/mutations';
import Logger, { analytics } from 'config/logger';
import { listAllEvents, listAllBoards, getEvent } from 'mygraphql/queries';
import { createEventResponse } from 'helpers/optimisticResponse';
import SimpleToast from 'react-native-simple-toast';

const alias =  'withNewEventContainer';

export default compose(
  graphql(gql(getEvent), {
    alias,
    options: props => {
      const id = props.navigation.getParam('id');
      return ({
        onError: error => {
          analytics({
            component: alias,
            logType: 'getEventQuery',
            error
          });
          SimpleToast.show('Failed to create event', SimpleToast.SHORT);
          Logger.debug(error.message);
        },
        variables: {
          id
        },
        fetchPolicy: 'cache-only'
      });
    },
    props: ({ data, ownProps }) => ({
      event: data && data.getEvent,
      isNew: ownProps.navigation.getParam('isNew'),
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
      onError: error => analytics({
        logType: 'createEventMutation',
        error,
        component: alias
      })
    },
    props: ({ mutate, ownProps }) => ({
      onSubmit: (input) => mutate({
        variables: {
          input
        },
        optimisticResponse: () => createEventResponse(input),
        update: (cache, { data: { createEvent } }) => {
          if (createEvent) {
            const query = gql(listAllEvents);
            const data = cache.readQuery({ query });
            data.listAllEvents.items = [
              ...data.listAllEvents.items.filter(item => item.id !== createEvent.id),
              createEvent
            ];
            cache.writeQuery({ query, data });
          }
        }
      }),
      ...ownProps
    })
  }),
  graphql(gql(listAllBoards), {
    alias,
    options: {
      fetchPolicy: 'cache-only',
      onError: (error) => {
        analytics({
          logType: 'listAllBoardsQuery',
          component: alias,
          error
        });
      }
    },
    props: ({ data, ownProps }) => {
      const id = ownProps.navigation.getParam('boardId');
      return ({
        boards: data && data.listAllBoards && data.listAllBoards.items,
        boardId: id,
        ...ownProps
      });
    }
  })
)(Screen);