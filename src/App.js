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
} from './components/screens';

const AppStack = createStackNavigator({
  Home,
  NewEvent,
  NewGroup
}, {
  initialRouteName: 'Home',
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