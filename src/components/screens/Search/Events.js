import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import List from '../../lists/EventSearch';
import Fab from '../../common/Fab';
import { listAllEvents } from '../../../graphql/queries';

export default class Events extends React.Component {

  render() {
    const query = this.props.navigation.getParam('query', '');
    return (
      <React.Fragment>
        <List
          query={query}
        />
        <Fab
          small
          icon="near-me"
          onPress={() => null}
        />
      </React.Fragment>
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