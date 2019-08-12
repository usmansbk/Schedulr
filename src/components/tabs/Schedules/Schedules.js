import React from 'react';
import List from 'components/lists/Schedules';
import FAB from 'components/common/Fab';

function getFields(schedule) {
  return {
    id: schedule.id,
    name: schedule.name,
    status: schedule.status,
    isPublic: schedule.isPublic,
    isOwner: schedule.isOwner
  };
}

export default class Schedules extends React.Component {
  state = {
    schedules: []
  };

  get schedules() {
    const { created, following } = this.props.data;
    let schedules = [];
    schedules = schedules.concat(created.items.map(getFields))
      .concat(following.items.map(item => getFields(item.schedule)));
    return schedules;
  }

  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();

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