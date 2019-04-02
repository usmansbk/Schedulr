import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import { listEventComments } from 'mygraphql/queries';
import { createComment } from 'mygraphql/mutations';
import { createCommentResponse } from 'helpers/optimisticResponse';
import SimpleToast from 'react-native-simple-toast';

const alias = 'withCommentsScreen';

export default compose(
  graphql(gql(listEventComments), {
    alias,
    options: props => ({
      notifyOnNetworkStatusChange: true,
      variables: {
        id: props.navigation.getParam('id')
      },
      fetchPolicy: 'cache-and-network',
      onError: () => SimpleToast.show('Failed to fetch comments', SimpleToast.SHORT),
    }),
    props: ({ data, ownProps }) => ({
      eventId: ownProps.navigation.getParam('id'),
      loading: data.loading || data.networkStatus === 4,
      error: data.error,
      onRefresh: async () => {
        try {
          await data.refetch();
        } catch (e) {
          SimpleToast.show('Refresh failed', SimpleToast.SHORT);
        }
      },
      comments: data && data.listComments && data.listComments.items && data.listComments.items.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)),
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
        },
        update: (cache, { data: { createComment } }) => {
          if (createComment) {
            const id = ownProps.navigation.getParam('id');
            const query = gql(listEventComments);
            const data = cache.readQuery({ query, variables: { id } });
            const comment = Object.assign({}, createComment);
            delete comment.event;
            data.listComments.items = [
              ...data.listComments.items.filter(item => item.id !== createComment.id),
              comment
            ];
            cache.writeQuery({ query, data, variables: { id }});
          }
        },
        optimisticResponse: () => createCommentResponse(input, ownProps.navigation.getParam('id'))
      }),
      ...ownProps
    })
  }),
)(Screen);