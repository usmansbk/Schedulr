import React from 'react';
import { Dimensions } from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MoreRoute from '../../tabs/More';
import ExploreTab from '../../tabs/Explore';
import HomeRoute from '../../tabs/Home';
import NotificationRoute from '../../tabs/Notifications';
import NotificationsIcon from '../../common/NotificationIcon';
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
      } else if (routeName === 'Notifications') {
        return (
          <NotificationsIcon
            size={focused ? FONT_SIZE : BLUR_SIZE}
            color={tintColor}
          />
        );
      } else if (routeName === 'More') {
        iconName = 'menu';
      }
      return <Icon name={iconName} size={focused ? FONT_SIZE : BLUR_SIZE} color={tintColor} />
    }
  }),
});

export default createAppContainer(Home);
