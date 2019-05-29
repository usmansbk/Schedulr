import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from './Screen';
import logger, { analytics } from 'config/logger';
import { listEventComments } from 'mygraphql/queries';
import { createComment } from 'mygraphql/mutations';
import { createCommentResponse } from 'helpers/optimisticResponse';
import SimpleToast from 'react-native-simple-toast';

const alias = 'withCommentsScreen';

const LIMIT = 15;

export default compose(
  graphql(gql(listEventComments), {
    alias,
    options: props => ({
      notifyOnNetworkStatusChange: true,
      variables: {
        id: props.navigation.getParam('id'),
        limit: LIMIT
      },
      fetchPolicy: 'cache-and-network',
      onError: (error) => {
        SimpleToast.show('Failed to fetch comments', SimpleToast.SHORT);
        logger.debug(error.message);
        analytics({
          name: 'list_comment',
          alias,
          error
        });
      },
    }),
    props: ({ data, ownProps }) => ({
      eventId: ownProps.navigation.getParam('id'),
      loading: data.loading || data.networkStatus === 4,
      error: data.error,
      onRefresh: () => data.refetch(),
      comments: data && data.listComments && data.listComments.items && data.listComments.items || [],
      nextToken: data && data.listComments && data.listComments.nextToken,
      fetchMoreComments: (nextToken=null, limit=LIMIT) => data.fetchMore({
        variables: {
          nextToken,
          limit
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            const moreComments = fetchMoreResult.listComments && fetchMoreResult.listComments.items;
            return Object.assign({}, previousResult, {
              listComments: Object.assign({}, previousResult.listComments,  {
                nextToken: fetchMoreResult.listComments.nextToken,
                items: [
                  ...previousResult.listComments.items,
                  ...moreComments
                ]
              })
            });
          }
          return previousResult;
        }
      }),
      ...ownProps
    })
  }),
  graphql(gql(createComment), {
    alias,
    options: {
      onError: error => {
        SimpleToast.show('Failed to post comment', SimpleToast.SHORT);
        logger.debug(error.message);
        analytics({
          name: 'create_comment',
          alias,
          error
        });
      }
    },
    props: ({ mutate, ownProps }) => ({
      onSubmit: (input) => mutate({
        variables: {
          input
        },
        update: (cache, { data: { createComment } }) => {
          if (createComment) {
            const id = ownProps.navigation.getParam('id');
            const query = gql(listEventComments);
            const data = cache.readQuery({
              query,
              variables: {
                id,
              }
            });
            data.listComments.items = [
              createComment,
              ...data.listComments.items.filter(item => item.id !== createComment.id),
            ];
            cache.writeQuery({
              query,
              data,
              variables: {
                id,
              }
            });
          }
        },
        optimisticResponse: () => createCommentResponse(input, ownProps.navigation.getParam('id')),
        refetchQueries: [
          {
            query: gql(listEventComments),
            variables: {
              id: ownProps.navigation.getParam('id'),
              limit: LIMIT
            },
          }
        ]
      }),
      ...ownProps
    })
  }),
)(Screen);