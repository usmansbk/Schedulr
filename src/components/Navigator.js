/**
 * Schdlr App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import {
  HomeScreen,
  EventFormScreen,
  GroupFormScreen,
  AuthLoading,
  Members,
  ImageViewer,
  Settings,
  Help,
  Comments,
  Notifications,
  Search,
} from './screens';
import {
  EventCard,
  GroupScreen,
  GroupInfo,
  AddCommunity,
  Login
} from '../containers/screens';
import Drawer from './common/Drawer'
import Auth from '../containers/Auth';

const AuthenticationNavigator = createStackNavigator({
  Login,
  AddCommunity
}, {
  initialRouteName: 'AddCommunity'
});

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  NewEvent: EventFormScreen,
  EditEvent: EventFormScreen,
  Reschdl: EventFormScreen,
  NewGroup: GroupFormScreen,
  EditGroup: GroupFormScreen,
  EventCard,
  GroupScreen,
  Members,
  ImageViewer,
  GroupInfo,
  Settings,
  Help,
  Login: Auth,
  Comments,
  Notifications,
  Search,
}, {
  initialRouteName: 'Home'
});

const MyApp = createSwitchNavigator(
  {
    AuthLoading,
    App: AppNavigator,
    Auth: AuthenticationNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createDrawerNavigator(
  {
    Home: {
      screen: MyApp,
    },
    Help: {
      screen: Help
    },
    Settings: {
      screen: Settings
    },
  },
  {
    contentComponent: Drawer
  }
)