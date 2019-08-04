import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import uniqWith from 'lodash.uniqwith';
import { inject, observer } from 'mobx-react';
import sortSchedules from 'lib/utils';
import List from 'components/lists/ScheduleSearch';
import { listAllSchedules, searchSchedule } from 'mygraphql/queries';
import { SEARCH_PAGE_SIZE, SEARCH_DISTANCE } from 'lib/constants';

class Schedules extends React.Component {

  componentWillUnmount = () => this.props.stores.appState.onChangeText('');

  render() {
    const { stores } = this.props;

    const { query, isConnected, location } = stores.appState;

    return (
      <ListHoc
        query={query}
        isConnected={isConnected}
        location={location.lat ? location : null}
      />
    );
  }
}

const ListHoc = compose(
  graphql(gql(listAllSchedules), {
    alias: 'withSearchSchedulesOffline',
    skip: props => props.isConnected,
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: ({ data, ownProps }) => ({
      schedules: data && data.listAllSchedules && sortSchedules(data.listAllSchedules.items.filter(
        item => item.name.toLowerCase().includes(ownProps.query.toLowerCase())
      )),
      ...ownProps
    })
  }),
  graphql(gql(searchSchedule), {
    alias: 'withSearchSchedulesOnline',
    skip: props => !props.isConnected || !props.query,
    options: props => ({
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      variables: {
        filter: {
          query: props.query,
          location: props.location,
          distance: SEARCH_DISTANCE
        },
        size: SEARCH_PAGE_SIZE
      }
    }),
    props: ({ data, ownProps }) => ({
      loading: data.loading || data.networkStatus === 4,
      schedules: data && data.searchSchedule && data.searchSchedule.items,
      from: data && data.searchSchedule && data.searchSchedule.nextToken,
      onRefresh: () => data.refetch(),
      fetchMore: (from, size=SEARCH_PAGE_SIZE) => data.fetchMore({
        variables: {
          filter: {
            query: ownProps.query,
            location: ownProps.location,
            distance: '150km'
          },
          from,
          size
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            const moreSchedules = fetchMoreResult.searchSchedule && fetchMoreResult.searchSchedule.items;
            return Object.assign({}, previousResult, {
              searchSchedule: Object.assign({}, previousResult.searchSchedule,  {
                nextToken: fetchMoreResult.searchSchedule.nextToken,
                items: uniqWith([
                  ...previousResult.searchSchedule.items,
                  ...moreSchedules
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

export default inject("stores")(observer(Schedules));