import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Updates from './Notifications';

const Screen = createMaterialTopTabNavigator({
  Updates
}, {
  initialRouteName: 'Updates',
  initialLayout: { height: 0, width: Dimensions.get('window').width },
  tabBarOptions: {
    upperCaseLabel: false,
  },
});

export default Screen;
