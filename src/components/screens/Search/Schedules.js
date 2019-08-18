import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import sortSchedules from 'lib/utils';
import List from 'components/lists/ScheduleSearch';
import { getUserSchedules } from 'api/queries';

function mergeSchedules(data, query) {
  const { created, following } = data;
  const s = created.items.concat(following.items);
  return sortSchedules(s.filter(item => item.name.toLowerCase().includes(query.toLowerCase())));
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
        location={location.lat ? location : null}
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
      schedules: data && data.getUserSchedules && mergeSchedules(data.getUserSchedules, ownProps.query),
      ...ownProps
    })
  }),
)(List);

export default inject("stores")(observer(Schedules));