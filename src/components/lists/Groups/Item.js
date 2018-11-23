import React from 'react';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

export default class Item extends React.PureComponent {
  render() {
    return (
      <TouchableRipple>
        <View>
          <Text>Test</Text>
        </View>
      </TouchableRipple>
    )
  }
}