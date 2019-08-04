import React from 'react';
import Schedule from './Hoc';

export default class Screen extends React.Component {
  _onBack = () => this.props.navigation.goBack();

  render() {
    const id = this.props.navigation.getParam('id');
    const cacheFirst = this.props.navigation.getParam('cacheFirst');
    
    return (
      <Schedule
        id={id}
        cacheFirst={cacheFirst}
        onPress={this._onBack}
      />
    );
  }
}
