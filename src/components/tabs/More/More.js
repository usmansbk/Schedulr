import React from 'react';
import { Appbar } from 'react-native-paper';
import List from '../../lists/More';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default (props) => (
  <React.Fragment>
    <Appbar.Header style={styles.header} collapsable>
      <Appbar.BackAction
        color={colors.gray}
        onPress={() => props.navigation.goBack()}
      />
      <Appbar.Content
        titleStyle={styles.headerColor}
      />
    </Appbar.Header>
    <List
      navigateToSettings={() => props.navigation.navigate('Settings')}
    />
  </React.Fragment>
);
