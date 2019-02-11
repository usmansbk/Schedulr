import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import { withCollapsibleForTabChild } from 'react-navigation-collapsible';
import List from '../../lists/Boards';
import { followingBoards } from '../../../graphql/queries';

class Boards extends React.Component {
  render() {
    const { animatedY, onScroll } = this.props.collapsible;

    return (
      <List
        loading={this.props.loading}
        boards={this.props.boards}
        onRefresh={this.props.onRefresh}
        animatedY={animatedY}
        onScroll={onScroll}
        profile
      />
    )
  }
}

export default compose(
  withCollapsibleForTabChild,
  graphql(gql(followingBoards), {
    alias: 'withUserFollowingBoardsTab',
    options: props => ({
      variables: {
        id: props.navigation.getParam('id')
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }),
    props: ({ data, ownProps }) => ({
      loading: data.loading || data.networkStatus === 4,
      boards: data && data.followingBoards && data.followingBoards.followingBoards && data.followingBoards.followingBoards.items || [],
      error: data.error,
      onRefresh: async () => {
        try {
          await data.refetch();
        } catch(e) {
          SimpleToast.show(e.message, SimpleToast.SHORT);
        }
      },
      ...ownProps
    }),
  })
)(Boards);