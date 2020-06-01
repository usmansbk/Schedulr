import React from 'react';
import ScheduleEvents from './Hoc';

export default class Screen extends React.Component {
  _onBack = () => this.props.navigation.goBack();

  render() {
    const id = this.props.navigation.getParam('id');
    
    return (
      <ScheduleEvents
        id={id}
        onPress={this._onBack}
        navigation={this.props.navigation}
      />
    );
  }
}
