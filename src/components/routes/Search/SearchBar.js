import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default (props) => (
  <Searchbar
    icon="search"
    placeholder="Search "
    value=""
    style={styles.searchbar}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    elevation: 0
  }
});