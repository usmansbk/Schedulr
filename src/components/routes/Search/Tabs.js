import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import Events from './Events';
import Groups from './Groups';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#fff',
    elevation: 2
  },
  indicatorStyle: {
    backgroundColor: colors.primary_light
  }
});

const Tabs = createMaterialTopTabNavigator({
  Groups: { screen: Groups },
  Events: { screen: Events }
}, {
  initialRouteName: 'Groups',
  lazy: true,
  initialLayout: { height: 0, width: Dimensions.get('window').width },
  tabBarOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.gray,
    style: styles.barStyle,
    upperCaseLabel: false,
    indicatorStyle: styles.indicatorStyle
  },
});


export default createAppContainer(Tabs);
