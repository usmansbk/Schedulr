import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { listEventComments } from '../../../graphql/queries';
import { createComment, deleteComment } from '../../../graphql/mutations';

const alias = 'withCommentsScreen';

export default compose(
  graphql(gql(listEventComments), {
    alias,
    options: props => ({
      notifyOnNetworkStatusChange: true,
      variables: {
        id: props.navigation.getParam('id')
      },
      fetchPolicy: 'cache-and-network'
    }),
    props: ({ data, ownProps }) => ({
      eventId: ownProps.navigation.getParam('id'),
      loading: data.loading || data.networkStatus === 4,
      error: data.error,
      onRefresh: () => data.refetch(),
      comments: data && data.listComments && data.listComments.items,
      nextToken: data && data.listComments && data.listComments.nextToken,
      ...ownProps
    })
  }),
  graphql(gql(createComment), {
    alias,
    props: ({ mutate, ownProps }) => ({
      onSubmit: async (input) => await mutate({
        variables: {
          input
        }
      }),
      ...ownProps
    })
  }),
  graphql(gql(deleteComment), {
    alias,
    props: ({ mutate, ownProps }) => ({
      onDelete: async (input) => await mutate({
        variables: {
          input
        },
        update: (cache, { data: { deleteComment } }) => {
          if (deleteComment) {
            const query = gql(listEventComments);
            const data = cache.readQuery({ query });
            data.listEventComments.items = data.listEventComments.items.filter(item => item.id !== deleteComment.id);
            cache.writeQuery({ query, data });
          }
        }
      }),
      ...ownProps
    })
  }),
)(Screen);