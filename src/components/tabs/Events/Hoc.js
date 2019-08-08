// import { graphql, compose } from 'react-apollo';
// import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
// import gql from 'graphql-tag';
import Events from './Events';

export default inject("stores")(observer(Events));

// import { listAllEvents } from 'mygraphql/queries';
// import { filterEvents } from 'mygraphql/filter';

// const alias = 'withEventsContainer';
// const BaseQuery = gql(listAllEvents);

// export default inject("stores")(observer(
//   compose(
//     withNavigationFocus,
//     graphql(BaseQuery, {
//       alias,
//       options: {
//         fetchPolicy: 'cache-first',
//         notifyOnNetworkStatusChange: true,
//         variables: {
//           filter: filterEvents
//         }
//       },
//       props: ({ data, ownProps}) => ({
//         loading: data.loading || data.networkStatus === 4,
//         events: data && data.listAllEvents && data.listAllEvents.items || [],
//         nextToken: data && data.listAllEvents && data.listAllEvents.nextToken,
//         error: data.error,
//         onRefresh: () =>  data.refetch(),
//         ...ownProps
//       })
//     }),
//   )(Events)
// ));