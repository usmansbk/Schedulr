import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EventsRoute from '../Events';
import BoardsRoute from '../Boards';
import StarredRoute from '../Starred';
import styles, { activeColor, inactiveTintColor, FONT_SIZE } from './styles';

const Home = createMaterialTopTabNavigator({
  Events: { screen: EventsRoute },
  Boards: { screen: BoardsRoute },
  Starred: { screen: StarredRoute },
}, {
  animationEnabled: true,
  initialRouteName: 'Events',
  initialLayout: { height: 0, width: Dimensions.get('window').width },
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
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Events') {
        iconName = 'calendar-week-begin'
      } else if (routeName === 'Boards') {
        iconName = 'google-circles-communities';
      } else if (routeName === 'Starred') {
        iconName = `star`;
      }
      return <Icon name={iconName} size={FONT_SIZE} color={tintColor} />
    }
  })
});

export default createAppContainer(Home);
