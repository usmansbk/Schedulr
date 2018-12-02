import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const primary = colors.primary;

export default StyleSheet.create({
  list: {
    backgroundColor: colors.light_gray
  },
  footer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    fontWeight: 'bold',
    color: colors.light_gray_3
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    marginHorizontal: 20,
    height: '100%'
  },
  emptyTitle: {
    fontSize: 25,
    color: colors.light_gray_3,
    textAlign: 'center'
  },
});