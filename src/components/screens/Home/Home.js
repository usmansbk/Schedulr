import React from 'react';
import { Dimensions } from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MoreRoute from 'components/tabs/More';
import ExploreTab from 'components/tabs/Explore';
import HomeRoute from 'components/tabs/Home';
import NotificationRoute from 'components/tabs/Notifications';
import NotificationsIcon from 'components/common/NotificationIcon';
import styles, { activeColor, inactiveTintColor, FONT_SIZE, BLUR_SIZE } from './styles';

const Home = createBottomTabNavigator({
  Home: { screen: HomeRoute },
  Explore: { screen: ExploreTab },
  Notifications: { screen: NotificationRoute },
  More: { screen: MoreRoute }
}, {
  initialRouteName: 'Home',
  initialLayout: { height: 0, width: Dimensions.get('window').width },
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: activeColor,
    inactiveTintColor,
    showLabel: false,
    showIcon: true,
    style: styles.barStyle,
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
        return (
          <NotificationsIcon
            size={focused ? FONT_SIZE : BLUR_SIZE}
            color={tintColor}
          />
        );
      }
      return <Icon name={iconName} size={focused ? FONT_SIZE : BLUR_SIZE} color={tintColor} />
    }
  }),
});

export default createAppContainer(Home);
