import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from 'config/colors';

export default () => (
  <View style={styles.container}>
    <Text style={styles.text}>S</Text>
  </View>
);

const LENGTH = 82;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light_gray,
    margin: 8,
    height: LENGTH,
    width: LENGTH,
    borderRadius: LENGTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 72,
    fontWeight: 'bold',
    color: colors.primary
  }
})