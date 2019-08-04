import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import uniqWith from 'lodash.uniqwith';
import List from 'components/lists/EventSearch';
import { listAllEvents, searchEvent } from 'mygraphql/queries';
import { SEARCH_PAGE_SIZE, SEARCH_DISTANCE } from 'lib/constants';
import { sortBookmarksEvents } from 'lib/utils';

class Events extends React.Component {

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
      events: data && data.listAllEvents && sortBookmarksEvents(data.listAllEvents.items.filter(
        item => item.title.toLowerCase().includes(ownProps.query.toLowerCase()) ||
          item.eventType.toLowerCase().includes(ownProps.query.toLowerCase())
      )),
      ...ownProps
    })
  }),
  graphql(gql(searchEvent), {
    alias: 'withSearchEventsOnline',
    skip: props => !props.isConnected || !props.query,
    options: props => ({
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: {
        filter: {
          query: props.query,
          location: props.location,
          distance: SEARCH_DISTANCE
        },
        size: SEARCH_PAGE_SIZE
      },
    }),
    props: ({ data, ownProps }) => ({
      loading: data.loading || data.networkStatus === 4,
      events: data && data.searchEvent && data.searchEvent.items,
      from: data && data.searchEvent && data.searchEvent.nextToken,
      onRefresh: () => data.refetch(),
      fetchMore: (from, size=SEARCH_PAGE_SIZE) => data.fetchMore({
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
                items: uniqWith([
                  ...previousResult.searchEvent.items,
                  ...moreEvents
                ], (a, b) => a.id === b.id)
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

export default inject("stores")(observer(Events));