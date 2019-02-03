import React from 'react';
import List from '../../lists/Boards';
import FAB from '../../common/Fab';

export default class Boards extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return ((nextProps.loading) !== this.props.loading) || (
      nextProps.boards !== this.props.boards
    );
  }
  
  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}