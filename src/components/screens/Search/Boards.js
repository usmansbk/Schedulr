import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react/native';
import List from 'components/lists/BoardSearch';
import { listAllBoards } from 'mygraphql/queries';

@inject('stores')
@observer
export default class Boards extends React.Component {
  
  render() {
    const { stores } = this.props;

    const { query, isConnected } = stores.appState;

    return (
      <ListHoc
        query={query}
        isConnected={isConnected}
      />
    );
  }
}

const ListHoc = compose(
  graphql(gql(listAllBoards), {
    alias: 'withSearchBoardsOffline',
    options: {
      fetchPolicy: 'cache-only'
    },
    props: ({ data, ownProps }) => ({
      loading: data.loading,
      boards: data && data.listAllBoards && data.listAllBoards.items.filter(
        item => item.name.toLowerCase().includes(ownProps.query.toLowerCase())
      ),
      ...ownProps
    })
  })
)(List);