import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import { withCollapsibleForTabChild } from 'react-navigation-collapsible';
import List from '../../lists/Boards';
import { createdBoards } from '../../../graphql/queries';

class Boards extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return ((nextProps.loading) !== this.props.loading) || (
      nextProps.boards !== this.props.boards
    );
  }
  
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

export default compose(graphql(gql(createdBoards), {
  alias: 'withUserCreatedBoardsTab',
  options: props => ({
    variables: {
      id: props.navigation.getParam('id')
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  }),
  props: ({ data, ownProps }) => ({
    loading: data.loading || data.networkStatus === 4,
    boards: data && data.createdBoards && data.createdBoards.createdBoards && data.createdBoards.createdBoards.items || [],
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
}), withCollapsibleForTabChild)(Boards);