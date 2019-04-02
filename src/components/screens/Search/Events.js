import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import List from 'components/lists/EventSearch';
import { listAllEvents } from 'mygraphql/queries';

export default class Events extends React.Component {

  render() {
    const query = this.props.navigation.getParam('query', '');
    return (
      <List
        query={query}
      />
    );
  }
}

// const ListHoc = compose(
//   graphql(gql(listAllEvents), {
//     alias: 'withSearchEventsOffline',
//     skip: props => false && props.isConnected,
//     options: {
//       fetchPolicy: 'cache-only'
//     },
//     props: ({ data, ownProps }) => ({
//       loading: data.loading,
//       events: data && data.listAllEvents && data.listAllEvents.items.filter(
//         item => item.title.toLowerCase().includes(ownProps.query.toLowerCase())
//       ),
//       ...ownProps
//     })
//   })
// )(List);