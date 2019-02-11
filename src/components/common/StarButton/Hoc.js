import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Button from './Button';
import { starEvent, unstarEvent } from '../../../graphql/mutations';
import { toggleStarButton } from '../../../helpers/optimisticResponse';
import { listAllEvents, getEvent } from '../../../graphql/queries';

export default compose(
  graphql(gql(starEvent), {
    alias: 'withStarEvent',
    options: {},
    props: ({ mutate, ownProps }) => ({
      onStarEvent: async (input, prev) => await mutate({
        variables: {
          input
        },
        optimisticResponse: () => toggleStarButton(input, prev, 'starEvent'),
        update: (cache, { data: { starEvent } }) => {
          const data = cache.readQuery(gql(listAllEvents));
          const eventNode = cache.readQuery(gql(getEvent), { id: ownProps.id});
          const event = Object.assign({}, eventNode.getEvent, starEvent);
          data.listAllEvents.items = [
            ...data.listAllEvents.items.filter(item => item.id !== starEvent.id),
            event
          ];
          cache.writeQuery({ query, data });
        }
      }),
      ...ownProps
    }),
  }),
  graphql(gql(unstarEvent), {
    alias: 'withUnstarEvent',
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