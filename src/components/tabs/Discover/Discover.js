import React from 'react';
import List from 'components/lists/Discover';

export default class Discover extends React.Component {
  render() {
    return (
      <List
        navigation={this.props.navigation}
      />
    )
  }
}