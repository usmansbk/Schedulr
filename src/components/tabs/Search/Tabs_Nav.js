import React from 'react';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Events from './Events';
import Boards from './Boards';
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
  Tabs: {
    screen: Tabs,
  },
}, {
  defaultNavigationOptions: ({ navigation }) => {
    return {
      header: (
        <Searchbar
          icon="search"
          placeholder="Search for..."
          onFocus={() => navigation.navigate('SearchScreen')}
          style={styles.searchbar}
        />
      )
    }
  }
})

export default createAppContainer(SearchStack);
