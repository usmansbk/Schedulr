import React from 'react';
import List from 'components/lists/Boards';
import FAB from 'components/common/Fab';

export default class Boards extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return (nextProps.loading !== this.props.loading) || (nextProps.boards !== this.props.boards);
  }
  
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
              onPress={() => this.props.navigation.navigate('NewBoard')}
              disabled={this.props.loading && !this.props.boards.length}
            />
          )
        }
      </>
    )
  }
}