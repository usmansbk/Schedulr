import React from 'react';
import { View, StyleSheet } from 'react-native';
import FAB from '../../common/Fab';

export default (props) => (
  <View style={styles.container}>
    <FAB
      icon="add"
      onPress={() => props.navigation.navigate('NewGroup')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
