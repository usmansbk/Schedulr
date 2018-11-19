import React from 'react';
import { View, StyleSheet } from 'react-native';
import FAB from '../../common/Fab';

export default (props) => (
  <View style={styles.container}>
    <FAB
      style={styles.fab}
      icon="add"
      onPress={() => props.navigation.navigate('NewGroup')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
