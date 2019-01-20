import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import LocalNotifications from 'react-native-push-notification';
import NavigationService from './config/navigation';
import {
  AuthLoading,
  Login,
  NewEvent,
  NewBoard,
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

// Configure notifications for local events reminder
LocalNotifications.configure({
  onNotification: notification => {
    const { data: { id } } = notification;
    NavigationService.navigate('EventDetails', { id });
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  }
});

const AppStack = createStackNavigator({
  Home,
  EditEvent,
  EditBoard,
  NewEvent,
  NewBoard,
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