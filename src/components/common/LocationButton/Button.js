import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

export default ({ location, size, color }) => (
  <View style={styles.icon}>
    <IconButton
      icon={`location-${location ? 'on' : 'off'}`}
      onPress={() => alert(location ? location : 'No address set')}
      color={color}
    />
  </View>
);

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 8,
    justifyContent: 'center'
  }
})