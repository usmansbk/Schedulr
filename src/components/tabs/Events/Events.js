import React from 'react';
import Toast from 'react-native-simple-toast';
import List from '../../lists/Events';
import FAB from '../../common/Fab';
import schdlAll from '../../../helpers/setReminders';

export default class Events extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return ((nextProps.loading) !== this.props.loading) || (
      nextProps.events !== this.props.events
    );
  };

  componentDidUpdate = () => {
    schdlAll(this.props.events);
  }

  render() {
    if (this.props.error) {
      Toast.show(this.props.error.name, Toast.LONG);
    }
    return (
      <React.Fragment>
        <List
          loading={this.props.loading}
          events={this.props.events}
          hasPreviousEvents={Boolean(this.props.nextToken)}
          onRefresh={this.props.onRefresh}
        />
        <FAB
          icon="edit"
          onPress={() => this.props.navigation.navigate('NewEvent')}
        />
      </React.Fragment>
    )
  }
}

