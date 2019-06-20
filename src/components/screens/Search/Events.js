import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/EventSearch';
import { listAllEvents } from 'mygraphql/queries';

@inject('stores')
@observer
export default class Events extends React.Component {

  render() {
    const { stores } = this.props;

    const { query, isConnected } = stores.appState;

    return (
      <ListHoc
        query={query}
        isConnected={isConnected}
        search
      />
    );
  }
}

const ListHoc = compose(
  graphql(gql(listAllEvents), {
    alias: 'withSearchEventsOffline',
    skip: props => props.isConnected,
    options: {
      fetchPolicy: 'cache-only'
    },
    props: ({ data, ownProps }) => ({
      loading: data.loading,
      events: data && data.listAllEvents && data.listAllEvents.items.filter(
        item => item.title.toLowerCase().includes(ownProps.query.toLowerCase()) ||
          item.eventType.toLowerCase().includes(ownProps.query.toLowerCase())
      ),
      ...ownProps
    })
  })
)(List);