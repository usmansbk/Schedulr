import React from 'react';
import { Searchbar } from 'react-native-paper';
import {
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { StyleSheet, Dimensions } from 'react-native';
import Events from './Events';
import Boards from './Boards';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  barStyle: {
    elevation: 4,
    backgroundColor: colors.white,
  },
  indicatorStyle: {
    backgroundColor: colors.primary_light
  },
  searchbar: {
    elevation: 0
  }
});

const Tabs = createMaterialTopTabNavigator(
  {
    Boards,
    Events
  },
  {
    initialRouteName: 'Boards',
    initialLayout: { height: 0, width: Dimensions.get('window').width },
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.gray,
      upperCaseLabel: false,
      indicatorStyle: styles.indicatorStyle,
      style: styles.barStyle
    },
    navigationOptions: ({ navigation }) => {
      return ({
        headerTransparent: false,
        header: (
          <Searchbar
            icon="arrow-back"
            onIconPress={() => navigation.goBack()}
            placeholder="Search for..."
            value={navigation.getParam('query', '')}
            onChangeText={(query) => navigation.setParams({ query })}
            style={{ elevation: 0 }}
          />
        )
      })
    },
    lazy: true
  }
);

export default Tabs;
