import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import List from '../../lists/BoardSearch';
import { listAllBoards } from '../../../graphql/queries';

class Boards extends React.PureComponent {
  render() {
    const {
      isConnected,
      navigateToBoard,
      navigateToBoardInfo
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
        navigateToBoard={navigateToBoard}
        navigateToBoardInfo={navigateToBoardInfo}
      />
    );
  }
}

export default compose(
  graphql(gql(listAllBoards), {
    skip: props => props.screenProps.isConnected,
    options: {
      fetchPolicy: 'cache-only'
    },
    props: ({ data, ownProps }) => ({
      loading: data.loading,
      boards: data && data.listAllBoards && data.listAllBoards.items.filter(item => item.name.toLowerCase().includes(ownProps.screenProps.query.toLowerCase())),
      ...ownProps
    })
  })
)(Boards);