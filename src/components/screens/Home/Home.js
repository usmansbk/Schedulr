import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AccountRoute from '../../routes/Account';
import SearchRoute from '../../routes/Search';
import HomeRoute from '../../routes/Home';
import NotificationRoute from '../../routes/Notifications';
import styles, { activeColor } from './styles';

const Home = createMaterialBottomTabNavigator({
  Home: { screen: HomeRoute },
  Search: { screen: SearchRoute },
  Notifications: { screen: NotificationRoute },
  Account: { screen: AccountRoute }
}, {
  initialRouteName: 'Home',
  activeColor,
  barStyle: styles.barStyle,
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'home'
      } else if (routeName === 'Search') {
        iconName = 'search';
      } else if (routeName === 'Notifications') {
        iconName = `notifications${focused ? '' : '-none'}`;
      } else if (routeName === 'Account') {
        iconName = 'menu';
      }
      return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />
    }
  })
});

export default createAppContainer(Home);
