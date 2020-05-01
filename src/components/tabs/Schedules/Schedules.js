import React from 'react';
import memoize from 'memoize-one';
import List from 'components/lists/Schedules';
import FAB from 'components/common/Fab';
import { mergeSchedules } from 'lib/utils';

export default class Schedules extends React.Component {

  _mergeAllSchedules = memoize(mergeSchedules);

  get schedules() {
    return this._mergeAllSchedules(this.props.data)
  }

  shouldComponentUpdate = (nextProps) => nextProps.isFocused;

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