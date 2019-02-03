import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { StyleSheet, Dimensions } from 'react-native';
import Created from './Created';
import Following from './Following';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  barStyle: {
    elevation: 2,
    backgroundColor: '#fff',
  },
  indicatorStyle: {
    backgroundColor: colors.primary_light
  }
});

const Tabs = createAppContainer(createMaterialTopTabNavigator(
  {
    Following,
    Created
  },
  {
    initialLayout: { height: 0, width: Dimensions.get('window').width },
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.gray,
      upperCaseLabel: false,
      indicatorStyle: styles.indicatorStyle,
      style: styles.barStyle
    },
  }
));

export default Tabs;

// export default createAppContainer(
//   createStackNavigator({
//     Tabs
//   }, {
//     defaultNavigationOptions: {
//       headerTitle: 'More',
//     }
//   })
// );