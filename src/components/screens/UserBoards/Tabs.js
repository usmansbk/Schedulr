import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation';
import { StyleSheet } from 'react-native';
import Created from './Created';
import Following from './Following';
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

export default createAppContainer(createMaterialTopTabNavigator(
  {
    Following,
    Created
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
