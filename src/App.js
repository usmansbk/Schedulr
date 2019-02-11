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
  EditEvent: {
    screen: EditEvent,
    navigationOptions: {
      header: null
    }
  },
  EditBoard: {
    screen: EditBoard,
    navigationOptions: {
      header: null
    }
  },
  NewEvent: {
    screen: NewEvent,
    navigationOptions: {
      header: null
    }
  },
  NewBoard: {
    screen: NewBoard,
    navigationOptions: {
      header: null
    }
  },
  EventDetails: {
    screen: EventDetails,
    navigationOptions: {
      header: null
    }
  },
  BoardEvents: {
    screen: BoardEvents,
    navigationOptions: {
      header: null
    }
  },
  BoardInfo: {
    screen: BoardInfo,
    navigationOptions: {
      header: null
    }
  },
  Help: {
    screen: Help,
    navigationOptions: {
      header: null
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      header: null
    }
  },
  UserProfile: {
    screen: UserProfile,
  },
  Comments: {
    screen: Comments,
    navigationOptions: {
      header: null
    }
  },
  Followers: {
    screen: Followers,
    navigationOptions: {
      header: null
    }
  },
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      header: null
    }
  }
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