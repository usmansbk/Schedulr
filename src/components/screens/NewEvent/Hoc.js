import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Container from './NewEvent';
import { createEvent } from '../../../graphql/mutations';
import { listAllBoards } from '../../../graphql/queries';

export default compose(
  graphql(gql(createEvent), {
    alias: 'NewEventContainer',
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
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: ({ data, ownProps }) => ({
      boards: data && data.listAllBoards && data.listAllBoards.items,
      ...ownProps
    })
  })
)(Container);