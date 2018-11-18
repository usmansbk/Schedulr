import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

export default () => (
  <FAB
    style={styles.fab}
    icon="add"
    onPress={() => console.log('Pressed')}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
