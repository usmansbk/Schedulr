import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation } from 'react-navigation';
import Dialog from './Dialog';
import { listAllEvents } from '../../../graphql/queries';
import { deleteEvent } from '../../../graphql/mutations';

export default compose(
  withNavigation,
  graphql(gql(deleteEvent), {
    alias: 'withDeleteEventDialog',
    props: ({ mutate, ownProps }) => ({
      onSubmit: async (input) => await mutate({
        variables: {
          input
        },
        optimisticResponse: () => ({
          __typename: 'Mutation',
          deleteEvent: {
            __typename: 'Event',
            id: input.id
          }
        }),
        update: (cache, { data: { deleteEvent } }) => {
          const query = gql(listAllEvents);
          const data = cache.readQuery({ query });
          data.listAllEvents.items = data.listAllEvents.items.filter(item => item.id !== deleteEvent.id);
          cache.writeQuery({ query, data });
        }
      }),
      ...ownProps
    })
  })
)(Dialog);