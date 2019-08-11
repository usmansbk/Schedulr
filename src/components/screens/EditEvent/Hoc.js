// import { graphql, compose } from 'react-apollo';
// import gql from 'graphql-tag';
import Screen from './Screen';

export default Screen;
// import { getEvent, listAllSchedules } from 'api/queries';
// import { updateEvent } from 'api/mutations';
// import { updateEventResponse } from 'helpers/optimisticResponse';

// const alias = 'withEditEventContainer';

// export default compose(
//   graphql(gql(getEvent), {
//     alias,
//     options: props => {
//       const id = props.navigation.getParam('id');
//       return ({
//         variables: {
//           id
//         },
//         fetchPolicy: 'cache-only'
//       });
//     },
//     props: ({ data, ownProps }) => ({
//       event: data && data.getEvent,
//       ...ownProps
//     })
//   }),
//   graphql(gql(listAllSchedules), {
//     alias,
//     options: {
//       fetchPolicy: 'cache-only',
//     },
//     props: ({ data, ownProps }) => ({
//       schedules: data && data.listAllSchedules && data.listAllSchedules.items,
//       ...ownProps
//     })
//   }),
//   graphql(gql(updateEvent), {
//     alias,
//     props: ({ mutate, ownProps }) => ({
//       onSubmit: (input) => mutate({
//         variables: {
//           input
//         },
//         optimisticResponse: () => updateEventResponse(input)
//       }),
//       ...ownProps,
//     })
//   })
// )(Screen);