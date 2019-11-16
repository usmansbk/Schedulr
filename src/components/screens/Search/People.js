import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/People';
import { searchPeople } from 'api/queries';
import { SEARCH_LIMIT } from 'lib/constants';
import { searchUserFilter } from 'graphql/filters';
import updateQuery from 'helpers/updateQuery';

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
        location={location}
        search
      />
    );
  }
}

const ListHoc = graphql(gql(searchPeople), {
  alias: 'withSearchPeople',
  skip: props => !(props.isConnected && props.query.trim() && (props.query.length() >= 2)),
  options: props => ({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: searchUserFilter(props.query),
      limit: SEARCH_LIMIT
    }
  }),
  props: ({ data, ownProps }) => ({
    loading: data.loading || data.networkStatus === 4,
    search: true,
    people: (data && data.searchUsers && data.searchUsers.items) || [],
    nextToken: data && data.searchUsers && data.searchUsers.nextToken,
    onRefresh: () => data.refetch(),
    fetchMore: nextToken => data.fetchMore({
      variables: {
        nextToken
      },
      updateQuery: (prev, { fetchMoreResult }) => (
        updateQuery({
          prev,
          fetchMoreResult,
          rootField: 'searchUsers'
        })
      )
    }),
    ...ownProps
  })
})(List);

export default inject("stores")(observer(People));