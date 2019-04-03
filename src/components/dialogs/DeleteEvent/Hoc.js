import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation } from 'react-navigation';
import Dialog from './Dialog';
import { listAllEvents } from 'mygraphql/queries';
import { deleteEvent } from 'mygraphql/mutations';
import { deleteEventResponse } from 'helpers/optimisticResponse';

export default compose(
  withNavigation,
  graphql(gql(deleteEvent), {
    alias: 'withDeleteEventDialog',
    props: ({ mutate, ownProps }) => ({
      onSubmit: async (input) => await mutate({
        variables: {
          input
        },
        optimisticResponse: () => deleteEventResponse(input),
        update: (cache, { data: { deleteEvent } }) => {
          if (deleteEvent) {
            const query = gql(listAllEvents);
            const data = cache.readQuery({ query });
            data.listAllEvents.items = data.listAllEvents.items.filter(item => item.id !== deleteEvent.id);
            cache.writeQuery({ query, data });
          }
        }
      }),
      ...ownProps
    })
  })
)(Dialog);