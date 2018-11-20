import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AccountRoute from '../../routes/Account';
import SearchRoute from '../../routes/Search';
import HomeRoute from '../../routes/Home';
import NotificationRoute from '../../routes/Notifications';
import NotificationsIcon from '../../common/NotificationIcon';
import styles, { activeColor, inactiveTintColor } from './styles';

const Home = createBottomTabNavigator({
  Home: { screen: HomeRoute },
  Search: { screen: SearchRoute },
  Notifications: { screen: NotificationRoute },
  Account: { screen: AccountRoute }
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
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'home'
      } else if (routeName === 'Search') {
        iconName = 'search';
      } else if (routeName === 'Notifications') {
        iconName = `notifications${focused ? '' : '-none'}`;
        return <NotificationsIcon name={iconName} focused={focused} size={25} color={tintColor}/>
      } else if (routeName === 'Account') {
        iconName = 'menu';
      }
      return <Icon name={iconName} size={25} color={tintColor} />
    }
  }),
});

export default createAppContainer(Home);
