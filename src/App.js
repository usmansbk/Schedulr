import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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
  EmailLogin,
  EditProfile,
  AvatarViewer,
  Banner,
  SchedulePicture,
  EventBookmarks,
  Intro,
  ViewEmbed,
  Album,
  AlbumViewer,
  CalendarEvent
} from 'components/screens';
import Thread from 'components/screens/Comments/Thread';
import colors from 'config/colors';

const AppStack = createStackNavigator({
  Home: {
    screen: Home,
    path: '',
    navigationOptions: {
      headerShown: false
    }
  },
  CalendarEvent: {
    screen: CalendarEvent,
    navigationOptions: {
      headerShown: false
    }
  },
  EditEvent: {
    screen: EditEvent,
    navigationOptions: {
      headerShown: false
    }
  },
  EditSchedule: {
    screen: EditSchedule,
    navigationOptions: {
      headerShown: false
    }
  },
  NewEvent: {
    screen: NewEvent,
    navigationOptions: {
      headerShown: false
    }
  },
  NewSchedule: {
    screen: NewSchedule,
    navigationOptions: {
      headerShown: false
    }
  },
  EventDetails: {
    screen: EventDetails,
    path: 'event/:id',
    navigationOptions: {
      headerShown: false
    }
  },
  Schedule: {
    screen: Schedule,
    navigationOptions: {
      headerShown: false
    }
  },
  ScheduleEvents: {
    screen: ScheduleEvents,
    navigationOptions: {
      headerShown: false
    }
  },
  EventBookmarks: {
    screen: EventBookmarks,
    navigationOptions: {
      headerShown: false
    }
  },
  ScheduleInfo: {
    screen: ScheduleInfo,
    path: 'schdl/:id',
    navigationOptions: {
      headerShown: false
    }
  },
  Help: {
    screen: Help,
    navigationOptions: {
      headerShown: false
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      headerShown: false
    }
  },
  ViewEmbed: {
    screen: ViewEmbed,
    navigationOptions: {
      headerShown: false
    }
  },
  UserProfile: {
    screen: UserProfile,
    navigationOptions: {
      headerShown: false
    }
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      headerShown: false
    }
  },
  UserSchedules: {
    screen: UserSchedules,
  },
  Thread: {
    screen: Thread,
    navigationOptions: {
      headerShown: false
    }
  },
  Comments: {
    screen: Comments,
    navigationOptions: {
      headerShown: false
    }
  },
  Followers: {
    screen: Followers,
    navigationOptions: {
      headerShown: false
    }
  },
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  AvatarViewer: {
    screen: AvatarViewer,
    navigationOptions: {
      headerShown: false
    }
  },
  Banner: {
    screen: Banner,
    navigationOptions: {
      headerShown: false
    }
  },
  SchedulePicture: {
    screen: SchedulePicture,
    navigationOptions: {
      headerShown: false
    }
  },
  Album: {
    screen: Album,
    navigationOptions: {
      headerShown: false
    }
  },
  AlbumViewer: {
    screen: AlbumViewer,
    navigationOptions: {
      headerShown: false
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
  EmailLogin
}, {
  headerMode: 'none',
  initialRouteName: 'Login',
});

const AppNavigator = createSwitchNavigator({
  Intro,
  AuthLoading,
  App: {
    screen: AppStack,
    path: 'app'
  },
  Auth: {
    screen: AuthStack,
    path: '',
  }
}, {
  initialRouteName: 'AuthLoading',
});

export default createAppContainer(AppNavigator);