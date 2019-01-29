import React from 'react';
import List from '../../lists/BoardSearch';

export default class Boards extends React.PureComponent {
  render() {
    const { isConnected, query } = this.props.screenProps;
    return (
      <List
        isConnected={isConnected}
      />
    );
  }
}
