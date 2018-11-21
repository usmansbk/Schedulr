import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import colors from '../../../config/colors';
import appStyles from '../../../config/styles';

export default (props) => (
  <View style={styles.container}>
    <Appbar.Header style={appStyles.header}>
      <Appbar.BackAction
        onPress={() => props.navigation.goBack()}
        color={colors.gray}
      />
      <Appbar.Content
        color={colors.gray}
        title="Notifications" />
      <Appbar.Action
        icon="clear-all"
        color={colors.gray}
        onPress={() => console.log('Clear Notifications')}
      />
    </Appbar.Header>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
