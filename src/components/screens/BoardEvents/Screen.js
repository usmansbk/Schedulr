import React from 'react';
import BoardEvents from './Hoc';

export default class Screen extends React.Component {
  _onBack = () => this.props.navigation.goBack();

  render() {
    const id = this.props.navigation.getParam('id');
    const cacheFirst = this.props.navigation.getParam('cacheFirst');
    
    return (
      <BoardEvents
        id={id}
        cacheFirst={cacheFirst}
        onPress={this._onBack}
      />
    );
  }
}
