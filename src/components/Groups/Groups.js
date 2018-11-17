import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Fab from '../common/SFab';
import MyGroups from '../../containers/Groups';

class Groups extends React.Component {
  _onPress = () => this.props.navigation.navigate('NewGroup', { title: 'New Group' });

  render() {
    return (
      <View style={{flex: 1}}>
        <MyGroups />
        <Fab
          onPress={this._onPress}
          name="plus"
        />
      </View>
    )
  }
}

export default withNavigation(Groups);