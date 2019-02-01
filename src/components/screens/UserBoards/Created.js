import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import List from '../../lists/Boards';
import { createdBoards } from '../../../graphql/queries';

class Boards extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return ((nextProps.loading) !== this.props.loading) || (
      nextProps.boards !== this.props.boards
    );
  }
  
  render() {
    return (
      <List
        loading={this.props.loading}
        boards={this.props.boards}
        onRefresh={this.props.onRefresh}
        profile
      />
    )
  }
}

export default graphql(gql(createdBoards), {
  alias: 'withUserCreatedBoardsTab',
  options: props => ({
    variables: {
      id: props.id
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
})(Boards);