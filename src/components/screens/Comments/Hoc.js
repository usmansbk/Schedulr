// import { graphql, compose } from 'react-apollo';
// import gql from 'graphql-tag';
import Screen from './Screen';

export default Screen;
// import { listEventComments } from 'mygraphql/queries';
// import { createComment } from 'mygraphql/mutations';
// import { createCommentResponse } from 'helpers/optimisticResponse';
// import { COMMENTS_LIMIT } from 'lib/constants';

// const alias = 'withCommentsScreen';

// const LIMIT = COMMENTS_LIMIT;

// export default compose(
//   graphql(gql(listEventComments), {
//     alias,
//     options: props => ({
//       notifyOnNetworkStatusChange: true,
//       variables: {
//         id: props.navigation.getParam('id'),
//         limit: LIMIT
//       },
//       fetchPolicy: 'cache-and-network',
//     }),
//     props: ({ data, ownProps }) => ({
//       eventId: ownProps.navigation.getParam('id'),
//       loading: data.loading || data.networkStatus === 4,
//       error: data.error,
//       onRefresh: async () => {
//         await data.refetch();
//       },
//       comments: data && data.listComments && data.listComments.items && data.listComments.items || [],
//       nextToken: data && data.listComments && data.listComments.nextToken,
//       fetchMoreComments: (nextToken=null, limit=LIMIT) => data.fetchMore({
//         variables: {
//           nextToken,
//           limit
//         },
//         updateQuery: (previousResult, { fetchMoreResult }) => {
//           if (fetchMoreResult) {
//             const moreComments = fetchMoreResult.listComments && fetchMoreResult.listComments.items;
//             return Object.assign({}, previousResult, {
//               listComments: Object.assign({}, previousResult.listComments,  {
//                 nextToken: fetchMoreResult.listComments.nextToken,
//                 items: [
//                   ...previousResult.listComments.items,
//                   ...moreComments
//                 ]
//               })
//             });
//           }
//           return previousResult;
//         }
//       }),
//       ...ownProps
//     })
//   }),
//   graphql(gql(createComment), {
//     alias,
//     props: ({ mutate, ownProps }) => ({
//       onSubmit: (input) => mutate({
//         variables: {
//           input
//         },
//         update: (cache, { data: { createComment } }) => {
//           if (createComment) {
//             const id = ownProps.navigation.getParam('id');
//             const query = gql(listEventComments);
//             const data = cache.readQuery({
//               query,
//               variables: {
//                 id,
//               }
//             });
//             data.listComments.items = [
//               createComment,
//               ...data.listComments.items.filter(item => item.id !== createComment.id),
//             ];
//             cache.writeQuery({
//               query,
//               data,
//               variables: {
//                 id,
//               }
//             });
//           }
//         },
//         optimisticResponse: () => createCommentResponse(input, ownProps.navigation.getParam('id')),
//         refetchQueries: [
//           {
//             query: gql(listEventComments),
//             variables: {
//               id: ownProps.navigation.getParam('id'),
//               limit: LIMIT
//             },
//           }
//         ]
//       }),
//       ...ownProps
//     })
//   }),
// )(Screen);