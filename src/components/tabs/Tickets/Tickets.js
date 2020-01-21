import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';

class Tickets extends React.Component {
  render() {
    return (
      <View>

      </View>
    );
  }
}

export default inject('stores')(observer(Tickets));