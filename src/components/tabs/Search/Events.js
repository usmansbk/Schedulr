import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import List from '../../lists/EventSearch';
import Fab from '../../common/Fab';
import navigation from '../../../config/navigation';
import { listAllEvents } from '../../../graphql/queries';

class Events extends React.PureComponent {
  render() {
    const {
      isConnected,
    } = this.props.screenProps;
    const {
      loading,
      events
    } = this.props;
    return (
      <React.Fragment>
        <List
          isConnected={isConnected}
          loading={loading}
          events={events}
        />
        {
          isConnected && (
            <Fab
              small
              icon="filter-list"
              onPress={() => null}
            />
          )
        }
      </React.Fragment>
    );
  }
}

export default compose(
  graphql(gql(listAllEvents), {
    alias: 'withSearchEventsOffline',
    skip: props => false && props.screenProps.isConnected,
    options: {
      fetchPolicy: 'cache-only'
    },
    props: ({ data, ownProps }) => ({
      loading: data.loading,
      events: data && data.listAllEvents && data.listAllEvents.items.filter(
        item => item.title.toLowerCase().includes(ownProps.screenProps.query.toLowerCase())
      ),
      ...ownProps
    })
  })
)(Events);