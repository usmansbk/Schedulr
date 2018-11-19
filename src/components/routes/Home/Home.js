import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
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
  tabBarOptions: {
    activeTintColor: activeColor,
    inactiveTintColor,
    upperCaseLabel: false,
    indicatorStyle: styles.indicatorStyle,
    style: styles.barStyle
  }
});

export default createAppContainer(Home);
