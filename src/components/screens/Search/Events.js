import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/EventSearch';
import { listAllEvents, searchEvent } from 'mygraphql/queries';

const PAGE_SIZE = 2;

@inject('stores')
@observer
export default class Events extends React.Component {

  render() {
    const { stores } = this.props;

    const { query, isConnected, location } = stores.appState;

    return (
      <ListHoc
        query={query}
        isConnected={isConnected}
        location={location.lat ? location : null}
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
  }),
  graphql(gql(searchEvent), {
    alias: 'withSearchEventsOnline',
    skip: props => !props.isConnected || !props.query,
    options: props => ({
      fetchPolicy: 'network-only',
      variables: {
        filter: {
          query: props.query,
          location: props.location,
          distance: '150km'
        },
        size: PAGE_SIZE
      },
      onError: error => alert(error.message)
    }),
    props: ({ data, ownProps }) => ({
      loading: data.loading || data.networkStatus === 4,
      events: data && data.searchEvent && data.searchEvent.items,
      from: data && data.searchEvent && data.searchEvent.nextToken,
      onRefresh: () => data.refetch(),
      fetchMore: (from, size=PAGE_SIZE) => data.fetchMore({
        variables: {
          from,
          size
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            const moreEvents = fetchMoreResult.searchEvent && fetchMoreResult.searchEvent.items;
            return Object.assign({}, previousResult, {
              searchEvent: Object.assign({}, previousResult.searchEvent,  {
                nextToken: fetchMoreResult.searchEvent.nextToken,
                items: [
                  ...previousResult.searchEvent.items,
                  ...moreEvents
                ]
              })
            });
          }
          return previousResult;
        }
      }),
      ...ownProps
    })
  })
)(List);