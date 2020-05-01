import React from 'react';
import Schedule from './Hoc';

export default class Screen extends React.Component {
  shouldComponentUpdate = nextProps => nextProps.isFocused;

  _onBack = () => this.props.navigation.goBack();

  render() {
    const id = this.props.navigation.getParam('id');
    
    return (
      <Schedule
        id={id}
        onPress={this._onBack}
      />
    );
  }
}
