import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Button from './Button';
import { bookmarkEvent, unbookmarkEvent } from 'mygraphql/mutations';
import { toggleStarButton } from 'helpers/optimisticResponse';
import { listAllEvents, getEvent } from 'mygraphql/queries';

export default compose(
  graphql(gql(bookmarkEvent), {
    alias: 'withStarEvent',
    props: ({ mutate, ownProps }) => ({
      onStarEvent: (input, prev) => mutate({
        variables: {
          input
        },
        optimisticResponse: () => toggleStarButton(input, prev, 'bookmarkEvent'),
        update: (cache, { data: { bookmarkEvent } }) => {
          const data = cache.readQuery({ query: gql(listAllEvents) });
          const eventNode = cache.readQuery({
           query: gql(getEvent),
           variables: {
             id: ownProps.id
           }
          });
          if (eventNode.getEvent) {
            const event = Object.assign({}, eventNode.getEvent, bookmarkEvent);
            data.listAllEvents.items = [
              ...data.listAllEvents.items.filter(item => item.id !== bookmarkEvent.id),
              event
            ];
            cache.writeQuery({ query: gql(listAllEvents), data });
          }
        }
      }),
      ...ownProps
    }),
  }),
  graphql(gql(unbookmarkEvent), {
    alias: 'withUnstarEvent',
    props: ({ mutate, ownProps }) => ({
      onUnstarEvent: (input, prev) => mutate({
        variables: {
          input
        },
        optimisticResponse: () => toggleStarButton(input, prev, 'unbookmarkEvent')
      }),
      ...ownProps
    }),
  })
)(Button);