import React from 'react';
import List from 'components/lists/Schedules';
import FAB from 'components/common/Fab';

export default class Schedules extends React.Component {
  state = {
    schedules: []
  };

  _extractSchedules = (data) => {
    console.log('data');
    const { created, following } = data;
    let schedules = [];
    schedules = schedules.concat(created.items.map(schedule => ({
      id: schedule.id,
      name: schedule.name,
      status: schedule.status,
      isPublic: schedule.isPublic,
      isOwner: schedule.isOwner
    })));
    console.log(schedules)
    this.setState({
      schedules
    });
  }

  componentDidMount = () => {
    const { data } = this.props;
    if (data) {
      this._extractSchedules(data);
    }
  };

  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();

  _navigateToNewSchedule = () => this.props.navigation.navigate('NewSchedule');
  
  render() {
    const {
      loading
    } = this.props;

    return (
      <>
        <List
          loading={loading}
          schedules={this.state.schedules}
        />
        <FAB
          icon="plus"
          onPress={this._navigateToNewSchedule}
        />
      </>
    )
  }
}