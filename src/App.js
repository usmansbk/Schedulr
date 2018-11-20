import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import {
  AuthLoading,
  Login,
  NewEvent,
  NewGroup,
  Home,
  EventDetails
} from './components/screens';

const AppStack = createStackNavigator({
  Home,
  NewEvent,
  NewGroup,
  EventDetails
}, {
  initialRouteName: 'EventDetails',
  headerMode: 'none'
});

const AuthStack = createStackNavigator({
  Login,
}, {
  headerMode: 'none'
});

const AppNavigator = createSwitchNavigator({
  AuthLoading,
  App: AppStack,
  Auth: AuthStack,
}, {
  initialRouteName: 'AuthLoading',
});

export default createAppContainer(AppNavigator);