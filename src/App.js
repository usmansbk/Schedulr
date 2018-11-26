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
  NewGroupEvent,
  RescheduleEvent,
  Home,
  EventDetails,
  GroupEvents,
  GroupInfo,
  Legal,
  Help,
  Settings
} from './components/screens';


const AppStack = createStackNavigator({
  Home,
  NewEvent,
  NewGroup,
  NewGroupEvent,
  RescheduleEvent,
  EventDetails,
  GroupEvents,
  GroupInfo,
  Legal,
  Help,
  Settings
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