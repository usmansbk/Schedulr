import React from 'react';
import { View, ToastAndroid } from 'react-native';
import { withNavigation } from 'react-navigation';
import NotificationsContainer from '../../containers/Notifications';
import Fab from '../common/SFab';

class Notifications extends React.Component {
  _onPress = () => ToastAndroid.show('cleared', ToastAndroid.SHORT);

  render() {
    return (
      <View style={{flex: 1}}>
        <NotificationsContainer />
        <Fab
          onPress={this._onPress}
          name="check"
        />
      </View>
    )
  }
}

export default withNavigation(Notifications);