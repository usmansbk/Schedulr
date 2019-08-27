import React from 'react';
import { Dimensions, StatusBar } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import MoreRoute from 'components/tabs/More';
import ExploreTab from 'components/tabs/Explore';
import HomeRoute from 'components/tabs/Home';
import NotificationRoute from 'components/tabs/Notifications';
import NotificationsIcon from 'components/common/NotificationIcon';

const FONT_SIZE = 25;

const Home = createBottomTabNavigator({
  Home: {
    screen: HomeRoute
  },
  Explore: { screen: ExploreTab },
  Notifications: {
    screen: NotificationRoute,
    path: 'notif'
  },
  More: { screen: MoreRoute }
}, {
  initialRouteName: 'Home',
  initialLayout: { height: 0, width: Dimensions.get('window').width },
  tabBarComponent: props => <TabBarComponent {...props} />,
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor, focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'home'
      } else if (routeName === 'Explore') {
        iconName = 'search';
      } else if (routeName === 'More') {
        iconName = 'menu';
      } else if (routeName === 'Notifications') {
        return <NotificationsIcon
          focused={focused}
          size={FONT_SIZE} color={tintColor}
          name="bell"
        />;
      }
      return <Icon name={iconName} size={FONT_SIZE} color={tintColor} />;
    }
  }),
});

const TabBarComponent = inject('stores')(observer(
  (props) => (
    <>
    <StatusBar
      backgroundColor={props.stores.themeStore.colors.light_gray_2}
      barStyle={props.stores.settingsStore.dark ? "light-content" : "dark-content"}
    />
    <BottomTabBar
      inactiveTintColor={props.stores.themeStore.colors.tint}
      activeTintColor={props.stores.themeStore.colors.primary}
      style={props.stores.appStyles.bottomTab.barStyle}
      {...props}
    />
    </>
  )
));

export default Home;
