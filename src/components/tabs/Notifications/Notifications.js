import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import List from '../../lists/Notifications';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default (props) => (
  <View style={styles.container}>
    <Appbar.Header style={styles.header} collapsable>
      <Appbar.BackAction
        color={colors.gray}
        onPress={() => props.navigation.goBack()}
      />
      <Appbar.Content
        titleStyle={styles.headerColor}
        title="Notifications" />
      <Appbar.Action
        icon="clear-all"
        color={colors.gray}
        onPress={() => console.log('Clear Notifications')}
      />
    </Appbar.Header>
    <List />
  </View>
);
