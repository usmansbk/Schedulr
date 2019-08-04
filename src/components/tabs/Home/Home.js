import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EventsRoute from '../Events';
import SchedulesRoute from '../Schedules';
import StarredRoute from '../Starred';

const FONT_SIZE = 24;

const Home = createMaterialTopTabNavigator({
  Events: { screen: EventsRoute },
  Schedules: { screen: SchedulesRoute },
  Starred: { screen: StarredRoute },
}, {
  initialRouteName: 'Events',
  initialLayout: { height: 0, width: Dimensions.get('window').width },
  tabBarComponent: props => <TabBarComponent {...props} />,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    upperCaseLabel: false,
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor, focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Events') {
        iconName = 'calendar-week-begin'
      } else if (routeName === 'Schedules') {
        iconName = 'bulletin-board';
      } else if (routeName === 'Starred') {
        iconName = `bookmark${focused ? '' : '-outline'}`;
      }
      return <Icon name={iconName} size={FONT_SIZE} color={tintColor} />
    }
  })
});

const TabBarComponent = inject('stores')(observer(
  (props) => (
    <MaterialTopTabBar
      inactiveTintColor={props.stores.themeStore.colors.tint}
      activeTintColor={props.stores.themeStore.colors.primary}
      indicatorStyle={props.stores.appStyles.topTab.indicatorStyle}
      style={props.stores.appStyles.topTab.barStyle}
      {...props}
    />
  )
));

export default Home;
