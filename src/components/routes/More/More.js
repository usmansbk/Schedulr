import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import { Appbar } from 'react-native-paper';
import List from '../../lists/More';

export default (props) => (
  <React.Fragment>
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => props.navigation.goBack()}
      />
      <Appbar.Content
        title="More" 
      />
    </Appbar.Header>
    <List />
  </React.Fragment>
);
