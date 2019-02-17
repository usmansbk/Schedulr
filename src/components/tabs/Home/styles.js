import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const activeColor = colors.primary;
export const inactiveTintColor = colors.gray;
export const FONT_SIZE = 24;

export default StyleSheet.create({
  container: {
    flex: 1
  },
  barStyle: {
    elevation: 4,
    backgroundColor: colors.white,
  },
  indicatorStyle: {
    backgroundColor: colors.primary_light
  }
});