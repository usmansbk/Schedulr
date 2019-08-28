import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import sortSchedules, { mergeSchedules } from 'lib/utils';
import List from 'components/lists/ScheduleSearch';
import { getUserSchedules, searchSchedules } from 'api/queries';
import { searchScheduleFilter } from 'api/filters';
import { PAGINATION_LIMIT } from "lib/constants";
import updateQuery from 'helpers/updateQuery';

function filterSchedules(schedules, query) {
  return sortSchedules(schedules.filter(
    item => item.name.toLowerCase().includes(query.toLowerCase())
  ));
}

class Schedules extends React.Component {

  static navigationOptions() {
    return {
      tabBarLabel: I18n.get("SEARCH_schedulesTabLabel")
    };
  }

  componentWillUnmount = () => this.props.stores.appState.onChangeText('');

  render() {
    const { stores } = this.props;

    const { query, isConnected, location, userId } = stores.appState;

    return (
      <ListHoc
        query={query}
        id={userId}
        isConnected={isConnected}
        location={location}
      />
    );
  }
}

const ListHoc = compose(
  graphql(gql(getUserSchedules), {
    alias: 'withSearchSchedulesOffline',
    skip: props => props.isConnected,
    options: props => ({
      fetchPolicy: 'cache-only',
      variables: {
        id: props.id
      }
    }),
    props: ({ data, ownProps }) => ({
      schedules: data && data.getUserSchedules && filterSchedules(mergeSchedules(data.getUserSchedules), ownProps.query),
      ...ownProps
    })
  }),
  graphql(gql(searchSchedules), {
    alias: 'withSearchSchedulesOnline',
    skip: props => !(props.isConnected && props.query),
    options: props => ({
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: {
        filter: searchScheduleFilter(props.query),
        limit: PAGINATION_LIMIT
      }
    }),
    props: ({ data, ownProps }) => ({
      loading: data && data.loading || data.networkStatus === 4,
      schedules: data && data.searchSchedules && data.searchSchedules.items || [],
      nextToken: data && data.searchSchedules && data.searchSchedules.nextToken,
      fetchMore: nextToken => data.fetchMore({
        variables: {
          nextToken
        },
        updateQuery: (prev, { fetchMoreResult }) => (
          updateQuery({
            prev,
            fetchMoreResult,
            rootField: 'searchSchedules'
          })
        ),
      }),
      ...ownProps
    })
  })
)(List);

export default inject("stores")(observer(Schedules));