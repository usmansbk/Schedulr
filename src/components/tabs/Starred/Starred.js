import React from 'react';
import List from 'components/lists/Events';

export default class Starred extends React.Component {
  
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
