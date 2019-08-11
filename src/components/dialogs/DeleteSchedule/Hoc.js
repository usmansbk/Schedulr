// import { graphql, compose } from 'react-apollo';
// import gql from 'graphql-tag';
// import { withNavigation } from 'react-navigation';
import Dialog from './Dialog';
export default Dialog;
// import { listAllSchedules, listAllEvents } from 'api/queries';
// import { deleteSchedule } from 'api/mutations';

// export default compose(
//   withNavigation,
//   graphql(gql(deleteSchedule), {
//     alias: 'withDeleteScheduleDialog',
//     props: ({ mutate, ownProps }) => ({
//       onSubmit: (input) => mutate({
//         variables: {
//           input
//         },
//         optimisticResponse: () => ({
//           __typename: 'Mutation',
//           deleteSchedule: {
//             __typename: 'Schedule',
//             id: input.id
//           }
//         }),
//         update: (cache, { data: { deleteSchedule } }) => {
//           if (deleteSchedule) {
//             const query = gql(listAllSchedules);
//             const data = cache.readQuery({ query });
//             data.listAllSchedules.items = data.listAllSchedules.items.filter(item => item.id !== deleteSchedule.id);
//             cache.writeQuery({ query, data });

//             const queryAllEvents = gql(listAllEvents);
//             const allEventsData = cache.readQuery({ query: queryAllEvents });
//             allEventsData.listAllEvents.items = allEventsData.listAllEvents.items.filter(item => (item.schedule && item.schedule.id) !== deleteSchedule.id);
//             cache.writeQuery({ query: queryAllEvents, data: allEventsData });
//           }
//         }
//       }),
//       ...ownProps
//     })
//   })
// )(Dialog);