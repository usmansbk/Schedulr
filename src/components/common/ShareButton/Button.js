import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

export default ({
  location,
  size,
  date,
  color,
}) => (
  <View style={styles.icon}>
    <IconButton
      icon="share"
      onPress={() => alert('share event')}
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