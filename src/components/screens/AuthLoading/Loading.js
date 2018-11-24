import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../../../config/colors';

export default () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color='#fff' />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.primary
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});