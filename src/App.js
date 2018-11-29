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
  Help,
  Settings,
  UserProfile,
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
  Help,
  Settings,
  UserProfile
}, {
  initialRouteName: 'GroupInfo',
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