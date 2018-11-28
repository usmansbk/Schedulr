import React from 'react';
import { Dimensions } from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MoreRoute from '../../routes/More';
import SearchRoute from '../../routes/Search';
import HomeRoute from '../../routes/Home';
import NotificationRoute from '../../routes/Notifications';
import NotificationsIcon from '../../common/NotificationIcon';
import styles, { activeColor, inactiveTintColor, FONT_SIZE } from './styles';


const Home = createBottomTabNavigator({
  Home: { screen: HomeRoute },
  Search: { screen: SearchRoute },
  Notifications: { screen: NotificationRoute },
  More: { screen: MoreRoute }
}, {
  initialRouteName: 'Home',
  initialLayout: { height: 0, width: Dimensions.get('window').width },
  tabBarOptions: {
    activeTintColor: activeColor,
    inactiveTintColor,
    showLabel: false,
    showIcon: true,
    style: styles.barStyle,
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.routeName !== 'Search',
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'home'
      } else if (routeName === 'Search') {
        iconName = 'search';
      } else if (routeName === 'Notifications') {
        return (
          <NotificationsIcon
            size={FONT_SIZE}
            color={tintColor}
          />
        );
      } else if (routeName === 'More') {
        iconName = 'menu';
      }
      return <Icon name={iconName} size={FONT_SIZE} color={tintColor} />
    }
  }),
});

export default createAppContainer(Home);
