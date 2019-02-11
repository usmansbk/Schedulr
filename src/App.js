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
  EditBoard,
  SearchScreen
} from './components/screens';
import colors from './config/colors';

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
  Followers,
  SearchScreen
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      borderBottomColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0
    },
    headerTitleStyle: { color: colors.white },
    headerTintColor: colors.white,
    headerTransparent: true,
  }
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