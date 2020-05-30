import React from 'react';
import List from 'components/lists/Schedules';
import FAB from 'components/common/Fab';
import { mergeSchedules } from 'lib/utils';

export default class Schedules extends React.Component {

  get schedules() {
    return mergeSchedules(this.props.data)
  }

  shouldComponentUpdate = (nextProps) => {
    return this.props.data !== nextProps.data;
  };

  _navigateToNewSchedule = () => this.props.navigation.navigate('NewSchedule');
  
  render() {
    return (
      <>
        <List schedules={this.schedules} />
        <FAB
          icon="plus"
          onPress={this._navigateToNewSchedule}
        />
      </>
    )
  }
}