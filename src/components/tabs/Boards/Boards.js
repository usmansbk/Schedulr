import React from 'react';
import List from 'components/lists/Schedules';
import FAB from 'components/common/Fab';

export default class Schedules extends React.Component {
  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();

  _navigateToNewSchedule = () => this.props.navigation.navigate('NewSchedule');
  
  render() {
    const {
      loading,
      boards,
      onRefresh,
      error
    } = this.props;

    return (
      <>
        <List
          loading={loading}
          boards={boards}
          onRefresh={onRefresh}
          error={error}
        />
        {
          
          !(Boolean(error) && !boards.length) && (
            <FAB
              icon="add"
              onPress={this._navigateToNewSchedule}
            />
          )
        }
      </>
    )
  }
}