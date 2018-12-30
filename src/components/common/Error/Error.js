import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Button
} from 'react-native-paper';

export default (props) => (
  <View style={styles.container}>
    <Button
      icon="refresh"
      onPress={props.onRefresh}
      mode="outlined"
    >
      Try again!
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})