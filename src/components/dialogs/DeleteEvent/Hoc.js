import { graphql, compose } from 'react-apollo';
import SimpleToast from 'react-native-simple-toast';
import gql from 'graphql-tag';
import { withNavigation } from 'react-navigation';
import Dialog from './Dialog';
import { listAllEvents } from '../../../graphql/queries';
import { deleteEvent } from '../../../graphql/mutations';
import { deleteEventResponse } from '../../../helpers/optimisticResponse';

export default compose(
  withNavigation,
  graphql(gql(deleteEvent), {
    alias: 'withDeleteEventDialog',
    options: {
      onCompleted: () => {
        SimpleToast.show('Event deleted', SimpleToast.SHORT);
      }
    },
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