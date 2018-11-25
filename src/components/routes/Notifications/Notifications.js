import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';
import List from '../../lists/Notifications';
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
        title="Notifications" />
      <Appbar.Action
        icon="clear-all"
        onPress={() => console.log('Clear Notifications')}
      />
    </Appbar.Header>
    <List />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
