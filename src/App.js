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
  NewBoard,
  NewBoardEvent,
  RescheduleEvent,
  Home,
  EventDetails,
  BoardEvents,
  BoardInfo,
  Help,
  Settings,
  UserProfile,
  Followers,
  Comments,
  EditEvent,
  EditBoard
} from './components/screens';


const AppStack = createStackNavigator({
  Home,
  EditEvent,
  EditBoard,
  NewEvent,
  NewBoard,
  NewBoardEvent,
  RescheduleEvent,
  EventDetails,
  BoardEvents,
  BoardInfo,
  Help,
  Settings,
  UserProfile,
  Comments,
  Followers
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