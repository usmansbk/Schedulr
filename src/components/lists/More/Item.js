import React from 'react';
import { View, Text } from 'react-native';

export default class Item extends React.PureComponent {
  render() {
    const {
      id,
      name,
      icon,
      onPress
    } = this.props;
    return (
      <View>
        <Text>Item</Text>
      </View>
    );
  }
}