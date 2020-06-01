import React from 'react';
import ScheduleEvents from './Hoc';

export default class Screen extends React.Component {
  render() {
    const id = this.props.navigation.getParam('id');
    
    return (
      <ScheduleEvents
        id={id}
        navigation={this.props.navigation}
      />
    );
  }
}
