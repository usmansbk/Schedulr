import React from 'react';
import {Dimensions} from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';
import {inject, observer} from 'mobx-react';
import Icon from 'components/common/Icon';
import EventsRoute from '../Events';
import SchedulesRoute from '../Schedules';
import BookmarksRoute from '../Bookmarks';

const FONT_SIZE = 24;

const Home = createMaterialTopTabNavigator(
  {
    Events: {screen: EventsRoute},
    Schedules: {screen: SchedulesRoute},
    Bookmarks: {screen: BookmarksRoute},
  },
  {
    initialRouteName: 'Events',
    initialLayout: {height: 0, width: Dimensions.get('window').width},
    tabBarComponent: (props) => <TabBarComponent {...props} />,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      upperCaseLabel: false,
    },
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor, focused}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Events') {
          iconName = 'calendar';
        } else if (routeName === 'Schedules') {
          iconName = 'team';
        } else if (routeName === 'Bookmarks') {
          iconName = `bookmark${focused ? '' : 'o'}`;
        }
        return <Icon name={iconName} size={FONT_SIZE} color={tintColor} />;
      },
    }),
  },
);

const TabBarComponent = inject('stores')(
  observer((props) => (
    <MaterialTopTabBar
      inactiveTintColor={props.stores.theme.colors.tint}
      activeTintColor={props.stores.theme.colors.primary}
      indicatorStyle={props.stores.styles.topTab.indicatorStyle}
      style={props.stores.styles.topTab.barStyle}
      {...props}
    />
  )),
);

export default Home;
