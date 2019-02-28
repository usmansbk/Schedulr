import { graphql, compose } from 'react-apollo';
import SimpleToast from 'react-native-simple-toast';
import gql from 'graphql-tag';
import Button from './Button';
import { starEvent, unstarEvent } from '../../../graphql/mutations';
import { toggleStarButton } from '../../../helpers/optimisticResponse';
import { listAllEvents, getEvent } from '../../../graphql/queries';

export default compose(
  graphql(gql(starEvent), {
    alias: 'withStarEvent',
    options: {
      onCompleted: () => {
        SimpleToast.show('Event saved', SimpleToast.SHORT);
      }
    },
    props: ({ mutate, ownProps }) => ({
      onStarEvent: async (input, prev) => await mutate({
        variables: {
          input
        },
        optimisticResponse: () => toggleStarButton(input, prev, 'starEvent'),
        update: (cache, { data: { starEvent } }) => {
          const data = cache.readQuery({ query: gql(listAllEvents) });
          const eventNode = cache.readQuery({
           query: gql(getEvent),
           variables: {
             id: ownProps.id
           }
          });
          if (eventNode.getEvent) {
            const event = Object.assign({}, eventNode.getEvent, starEvent);
            data.listAllEvents.items = [
              ...data.listAllEvents.items.filter(item => item.id !== starEvent.id),
              event
            ];
            cache.writeQuery({ query: gql(listAllEvents), data });
          }
        }
      }),
      ...ownProps
    }),
  }),
  graphql(gql(unstarEvent), {
    alias: 'withUnstarEvent',
    options: {
      onCompleted: () => {
        SimpleToast.show('Event unsaved', SimpleToast.SHORT);
      }
    },
    props: ({ mutate, ownProps }) => ({
      onUnstarEvent: async (input, prev) => await mutate({
        variables: {
          input
        },
        optimisticResponse: () => toggleStarButton(input, prev, 'unstarEvent')
      }),
      ...ownProps
    }),
  })
)(Button);