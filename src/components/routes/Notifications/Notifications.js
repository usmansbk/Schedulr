import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import FAB from '../../common/Fab';

export default (props) => (
  <View style={styles.container}>
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => props.navigation.goBack()}
      />
      <Appbar.Content title="Notifications" />
    </Appbar.Header>
    <FAB
      small
      style={styles.fab}
      icon="clear-all"
      onPress={() => alert('Clear Notifications')}
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
