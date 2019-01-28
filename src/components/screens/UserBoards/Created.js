import React from 'react';
import List from '../../lists/Boards';

export default class Boards extends React.Component {
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
      />
    )
  }
}