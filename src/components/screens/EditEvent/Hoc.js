import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { getEvent, listAllBoards } from '../../../graphql/queries';
import { updateEvent } from '../../../graphql/mutations';

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
      onSubmit: async (input) => await mutate({
        variables: {
          input
        }
      }),
      ...ownProps,
    })
  })
)(Screen);