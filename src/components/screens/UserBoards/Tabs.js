import { StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Following from './Following';
import Created from './Created';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  barStyle: {
    elevation: 2,
    backgroundColor: colors.white,
  },
  indicatorStyle: {
    backgroundColor: colors.primary_light
  }
});

const Tabs = createMaterialTopTabNavigator(
  {
    Following,
    Created,
  },
  {
    animationEnabled: true,
    initialLayout: { height: 0, width: Dimensions.get('window').width },
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.gray,
      upperCaseLabel: false,
      indicatorStyle: styles.indicatorStyle,
      style: styles.barStyle
    },
  }
);

export default Tabs;