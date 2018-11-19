import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EventsRoute from '../Events';
import GroupsRoute from '../Groups';
import StarredRoute from '../Starred';
import styles, { activeColor, inactiveTintColor } from './styles';

const Home = createMaterialTopTabNavigator({
  Events: { screen: EventsRoute },
  Groups: { screen: GroupsRoute },
  Starred: { screen: StarredRoute },
}, {
  initialRouteName: 'Events',
  lazy: true,
  initialLayout: {width: Dimensions.get('window').width },
  tabBarOptions: {
    activeTintColor: activeColor,
    inactiveTintColor,
    showIcon: true,
    showLabel: false,
    upperCaseLabel: false,
    indicatorStyle: styles.indicatorStyle,
    style: styles.barStyle
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Events') {
        iconName = 'date-range'
      } else if (routeName === 'Groups') {
        iconName = 'group-work';
      } else if (routeName === 'Starred') {
        iconName = `star${focused ? '' : '-border'}`;
      }
      return <Icon name={iconName} size={horizontal ? 20 : 24} color={tintColor} />
    }
  })
});

export default createAppContainer(Home);
