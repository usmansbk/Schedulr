import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/People';
import { searchPeople } from 'api/queries';
import { SEARCH_PAGE_SIZE, SEARCH_DISTANCE } from 'lib/constants';
import { searchUserFilter } from 'graphql/filters';

class People extends React.Component {

  static navigationOptions() {
    return {
      tabBarLabel: I18n.get("SEARCH_peopleTabLabel")
    };
  }

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

const ListHoc = graphql(gql(searchPeople), {
  alias: 'withSearchPeople',
  skip: props => !(props.isConnected && props.query),
  options: props => ({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: searchUserFilter(props.query)
    }
  }),
  props: ({ data, ownProps }) => ({
    loading: data.loading || data.networkStatus === 4,
    people: (data && data.searchUsers && data.searchUsers.items) || [],
    nextToken: data && data.searchPeople && data.searchPeople.nextToken,
    onRefresh: () => data.refetch(),
    ...ownProps
  })
})(List);

export default inject("stores")(observer(People));