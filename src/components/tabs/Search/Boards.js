import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import List from '../../lists/BoardSearch';
import navigation from '../../../config/navigation';
import { listAllBoards } from '../../../graphql/queries';

class Boards extends React.PureComponent {

  _navigateToBoard = (id) => navigation.navigate('BoardEvents', { id });
  _navigateToBoardInfo = (id) => navigation.navigate('BoardInfo', { id });

  render() {
    const {
      isConnected,
    } = this.props.screenProps;
    const {
      loading,
      boards
    } = this.props;
    return (
      <List
        isConnected={isConnected}
        boards={boards}
        loading={loading}
        navigateToBoard={this._navigateToBoard}
        navigateToBoardInfo={this._navigateToBoardInfo}
      />
    );
  }
}

export default compose(
  graphql(gql(listAllBoards), {
    alias: 'withSearchBoardsOffline',
    skip: props => props.screenProps.isConnected,
    options: {
      fetchPolicy: 'cache-only'
    },
    props: ({ data, ownProps }) => ({
      loading: data.loading,
      boards: data && data.listAllBoards && data.listAllBoards.items.filter(
        item => item.name.toLowerCase().includes(ownProps.screenProps.query.toLowerCase())
      ),
      ...ownProps
    })
  })
)(Boards);