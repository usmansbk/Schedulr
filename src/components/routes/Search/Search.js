import React from 'react';
import { View, StyleSheet } from 'react-native';
import Searchbar from './SearchBar';
import Tabs from './Tabs';

export default (props) => (
  <View style={styles.container}>
    <Searchbar
      icon="search"
      placeholder="Search Schdlr"
      value=""
    />
    <Tabs />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});