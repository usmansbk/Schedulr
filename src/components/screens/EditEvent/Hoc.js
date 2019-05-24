import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { getEvent, listAllBoards } from 'mygraphql/queries';
import { updateEvent } from 'mygraphql/mutations';
import { updateEventResponse } from 'helpers/optimisticResponse';

const alias = 'withEditEventContainer';

export default compose(
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
  }),
  graphql(gql(updateEvent), {
    alias,
    props: ({ mutate, ownProps }) => ({
      onSubmit: (input) => mutate({
        variables: {
          input
        },
        optimisticResponse: () => updateEventResponse(input)
      }),
      ...ownProps,
    })
  })
)(Screen);