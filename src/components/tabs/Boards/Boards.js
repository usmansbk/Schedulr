import React from 'react';
import List from 'components/lists/Boards';
import FAB from 'components/common/Fab';

export default class Boards extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return (nextProps.loading !== this.props.loading) || (nextProps.boards !== this.props.boards);
  }
  
  render() {
    return (
      <>
        <List
          loading={this.props.loading}
          boards={this.props.boards}
          onRefresh={this.props.onRefresh}
          error={this.props.error}
        />
        <FAB
          icon="add"
          onPress={() => this.props.navigation.navigate('NewBoard')}
        />
      </>
    )
  }
}