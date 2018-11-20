import React from 'react';
import { View, StyleSheet } from 'react-native';
import FAB from '../../common/Fab';

export default () => (
  <View style={styles.container}>
    <FAB
      small
      style={styles.fab}
      icon="clear-all"
      onPress={() => props.navigation.navigate('NewEvent')}
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
