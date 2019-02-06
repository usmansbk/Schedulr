import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation';
import { StyleSheet, Dimensions } from 'react-native';
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
    lazy: true
  }
);

export default createAppContainer(Tabs);
