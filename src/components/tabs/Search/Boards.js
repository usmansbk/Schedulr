import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import List from '../../lists/BoardSearch';
import { listAllBoards } from '../../../graphql/queries';

class Boards extends React.PureComponent {

  render() {
    const {
      loading,
      boards,
      isConnected
    } = this.props;
    return (
      <List
        isConnected={isConnected}
        boards={boards}
        loading={loading}
      />
    );
  }
}

export default compose(
  graphql(gql(listAllBoards), {
    alias: 'withSearchBoardsOffline',
    skip: props => props.isConnected,
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
)(Boards);