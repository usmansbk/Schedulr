import React from 'react';
import { Searchbar } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default () => (
  <View style={styles.container}>
    <Searchbar
      placeholder="Search"
      value=""
      style={styles.searchbar}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    elevation: 2
  }
});