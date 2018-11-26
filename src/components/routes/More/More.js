import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

export default (props) => (
  <View style={styles.container}>
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => props.navigation.goBack()}
      />
      <Appbar.Content
        title="More" 
      />
    </Appbar.Header>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
