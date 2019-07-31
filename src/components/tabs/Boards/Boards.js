import React from 'react';
import List from 'components/lists/Boards';
import FAB from 'components/common/Fab';

export default class Boards extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return (nextProps.loading !== this.props.loading) || (nextProps.boards !== this.props.boards);
  };

  componentDidMount = () => {
    if (this.props.stores.boardsSync.skipBaseQuery &&
      this.props.stores.appState.isConnected
    )
      this.props.fetchMore();
  };

  _navigateToNewBoard = () => this.props.navigation.navigate('NewBoard');
  
  render() {
    const {
      loading,
      boards,
      onRefresh,
      fetchMore,
      error
    } = this.props;

    return (
      <>
        <List
          loading={loading}
          boards={boards}
          onRefresh={onRefresh}
          fetchMore={fetchMore}
          error={error}
        />
        {
          
          !(Boolean(error) && !boards.length) && (
            <FAB
              icon="add"
              onPress={this._navigateToNewBoard}
              disabled={this.props.loading && !this.props.boards.length}
            />
          )
        }
      </>
    )
  }
}