import React from 'react';
import { View, StyleSheet } from 'react-native';
import List from '../../lists/Events';
import FAB from '../../common/Fab';

export default (props) => (
  <View style={styles.container}>
    <List />
    <FAB
      icon="edit"
      onPress={() => props.navigation.navigate('NewEvent')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
