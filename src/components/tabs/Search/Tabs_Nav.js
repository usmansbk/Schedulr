import React from 'react';
import {
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import { StyleSheet } from 'react-native';
import Events from './Events';
import Boards from './Boards';
import Searchbar from '../../common/Searchbar';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  barStyle: {
    elevation: 4,
    backgroundColor: '#fff',
  },
  indicatorStyle: {
    backgroundColor: colors.primary_light
  },
  searchbar: {
    elevation: 0
  }
});

const Tabs = createAppContainer(createMaterialTopTabNavigator(
  {
    Boards,
    Events
  },
  {
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.gray,
      upperCaseLabel: false,
      indicatorStyle: styles.indicatorStyle,
      style: styles.barStyle
    },
  }
));

const SearchStack = createStackNavigator({
  Tabs
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    header: <Searchbar 
      placeholder="Search for..."
      onPress={() => navigation.navigate('SearchScreen')}
    />
  })
})

export default createAppContainer(SearchStack);
