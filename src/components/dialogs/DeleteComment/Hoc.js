import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from './Dialog';
import { listEventComments, getEvent } from '../../../graphql/queries';
import { deleteComment } from '../../../graphql/mutations';

export default graphql(gql(deleteComment), {
  options: props => ({ 
    variables: {
      input: {
        id: props.id
      }
    }, 
    update: (cache, { data: { deleteComment } }) => {
      if (deleteComment) {
        const query = gql(listEventComments);
        const eventQuery = gql(getEvent);
        const id = props.eventId;

        const data = cache.readQuery({ query, variables: { id } });
        const prevEventData = cache.readQuery({ query: eventQuery, variables: { id } });

        data.listComments.items = data.listComments.items.filter(item => item.id !== deleteComment.id);
        prevEventData.getEvent.commentsCount = prevEventData.getEvent.commentsCount - 1;

        cache.writeQuery({ query, data });
        cache.writeData({ query: eventQuery, data: prevEventData });
      }
    },
    optimisticResponse: () => ({
      __typename: 'Mutation',
      deleteComment: {
        __typename: 'Comment',
        id: props.id
      }
    }),
  }),
  props: ({ mutate, ownProps }) => ({
    onDelete: async () => await mutate(),
    ...ownProps
  })
})(Dialog);