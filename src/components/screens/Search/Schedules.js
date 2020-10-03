import React from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import {mergeSchedules, filterSchedules} from 'lib/utils';
import List from 'components/lists/ScheduleSearch';
import {getUserSchedules, searchSchedules} from 'api/queries';
import {searchScheduleFilter} from 'api/filters';
// import {SEARCH_LIMIT} from 'lib/constants';
import updateQuery from 'helpers/updateQuery';
import logger from 'config/logger';
import Suspense from 'components/common/Suspense';

class Schedules extends React.Component {
  state = {
    display: false,
  };

  static navigationOptions() {
    return {
      tabBarLabel: I18n.get('SEARCH_schedulesTabLabel'),
    };
  }

  componentDidMount = () => {
    this.timer = setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
    logger.log('search_screen');
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.props.stores.appState.onChangeText('');
  };

  render() {
    if (!this.state.display) return <Suspense />;
    const {stores} = this.props;

    const {query, isConnected, userId} = stores.appState;

    return (
      <ListHoc
        query={query}
        id={userId}
        isConnected={isConnected}
        location={stores.location.searchLocation}
      />
    );
  }
}

const ListHoc = compose(
  graphql(gql(getUserSchedules), {
    alias: 'withSearchSchedulesOffline',
    skip: (props) => props.isConnected,
    options: (props) => ({
      fetchPolicy: 'cache-only',
      variables: {
        id: props.id,
      },
    }),
    props: ({data, ownProps}) => ({
      schedules:
        data &&
        data.getUserSchedules &&
        filterSchedules(mergeSchedules(data.getUserSchedules), ownProps.query),
      ...ownProps,
    }),
  }),
  graphql(gql(searchSchedules), {
    alias: 'withSearchSchedulesOnline',
    skip: (props) =>
      !(props.isConnected && props.query.trim() && props.query.length >= 2),
    options: (props) => ({
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: {
        filter: searchScheduleFilter(props.query, props.location),
        // limit: SEARCH_LIMIT,
      },
    }),
    props: ({data, ownProps}) => ({
      loading:
        (data && data.loading) ||
        data.networkStatus === 4 ||
        data.networkStatus === 3,
      schedules:
        (data && data.searchSchedules && data.searchSchedules.items) || [],
      nextToken: data && data.searchSchedules && data.searchSchedules.nextToken,
      onRefresh: () => data.refetch(),
      fetchMore: (nextToken) =>
        data.fetchMore({
          variables: {
            nextToken,
          },
          updateQuery: (prev, {fetchMoreResult}) =>
            updateQuery({
              prev,
              fetchMoreResult,
              rootField: 'searchSchedules',
            }),
        }),
      ...ownProps,
    }),
  }),
)(List);

export default inject('stores')(observer(Schedules));
