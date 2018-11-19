import React from 'react';
import { Searchbar } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default (props) => (
  <View style={styles.container}>
    <Searchbar
      icon="arrow-back"
      placeholder="Search "
      value=""
      style={styles.searchbar}
      onIconPress={() => props.navigation.goBack()}
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