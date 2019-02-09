import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../config/colors';

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_HEIGHT
  },
  emptyTitle: {
    fontSize: 25,
    color: colors.light_gray_3,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16
  },
  footer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
});