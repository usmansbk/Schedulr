import React from 'react';
import List from '../../lists/Events';

export default class Starred extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return nextProps.events.length !== this.props.events.length;
  }
  
  render() {
    return (
      <List
        animated
        listType="starred"
        navigation={this.props.navigation}
        loading={this.props.loading}
        events={this.props.events}
        onRefresh={this.props.onRefresh}
      />
    );
  }
}
