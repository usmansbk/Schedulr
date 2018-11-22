import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const activeColor = colors.primary;
export const inactiveTintColor = colors.gray;

export default StyleSheet.create({
  container: {
    flex: 1
  },
  barStyle: {
    elevation: 2,
    backgroundColor: '#fff',
  },
  indicatorStyle: {
    backgroundColor: colors.primary_light
  }
});