// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
import Dialog from './Dialog';
export default Dialog;
// import { cancelEvent } from 'mygraphql/mutations';
// import { cancelEventResponse } from 'helpers/optimisticResponse';

// export default graphql(gql(cancelEvent), {
//   alias: 'withCancelEventDialog',
//   props: ({ mutate, ownProps }) => ({
//     onSubmit: (input) => mutate({
//       variables: {
//         input
//       },
//       optimisticResponse: () => cancelEventResponse(input)
//     }),
//     ...ownProps
//   })
// })(Dialog);