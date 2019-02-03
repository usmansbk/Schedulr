import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation';
import { StyleSheet } from 'react-native';
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
  }
});

const Tabs = createMaterialTopTabNavigator(
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
);

export default createAppContainer(Tabs);
