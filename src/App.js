import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import {
  AuthLoading,
  Login,
  NewEvent,
  NewSchedule,
  Home,
  EventDetails,
  Schedule,
  ScheduleInfo,
  Help,
  Settings,
  UserProfile,
  UserSchedules,
  Followers,
  Comments,
  EditEvent,
  EditSchedule,
  SearchScreen,
  ScheduleEvents,
  WebView
} from 'components/screens';
import colors from 'config/colors';

const AppStack = createStackNavigator({
  Home: {
    screen: Home,
    path: ''
  },
  EditEvent: {
    screen: EditEvent,
    navigationOptions: {
      header: null
    }
  },
  EditSchedule: {
    screen: EditSchedule,
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
  NewSchedule: {
    screen: NewSchedule,
    navigationOptions: {
      header: null
    }
  },
  EventDetails: {
    screen: EventDetails,
    path: 'event/:id',
    navigationOptions: {
      header: null
    }
  },
  Schedule: {
    screen: Schedule,
    navigationOptions: {
      header: null
    }
  },
  ScheduleEvents: {
    screen: ScheduleEvents,
    navigationOptions: {
      header: null
    }
  },
  ScheduleInfo: {
    screen: ScheduleInfo,
    path: 'schdl/:id',
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
  UserSchedules: {
    screen: UserSchedules,
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
  },
  WebView: {
    screen: WebView,
    navigationOptions: {
      header: null
    }
  },
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
  App: {
    screen: AppStack,
    path: '',
  },
  Auth: AuthStack,
}, {
  initialRouteName: 'AuthLoading',
});

export default createAppContainer(AppNavigator);