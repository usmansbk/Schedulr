import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
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
        title="More" 
        titleStyle={styles.headerColor}
      />
    </Appbar.Header>
    <List
      navigateToSettings={() => props.navigation.navigate('Settings')}
    />
  </React.Fragment>
);
