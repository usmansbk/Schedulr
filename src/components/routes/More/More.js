import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';
import colors from '../../../config/colors';

export default (props) => (
  <View style={styles.container}>
    <StatusBar
      backgroundColor={colors.primary_dark}
      barStyle="light-content"
    />
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
