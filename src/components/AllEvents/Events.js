import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Fab from '../common/SFab';
import AllEvents from '../../containers/AllEvents';

class Events extends React.Component {
  _onPress = () => this.props.navigation.navigate('NewEvent', { title: 'New Event' });

  render() {
    return (
      <View style={{flex: 1}}>
        <AllEvents />
        <Fab
          onPress={this._onPress}
          name="edit-2"
        />
      </View>
    )
  }
}

export default withNavigation(Events);