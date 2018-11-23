import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const ITEM_HEIGHT = 80;
export const SEPARATOR_HEIGHT = 1;

export default StyleSheet.create({
  list: {
    backgroundColor: colors.light_gray
  },
  separator: {
    height: SEPARATOR_HEIGHT
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 56,
    paddingTop: 48,
    marginHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 27,
    color: colors.gray,
    fontWeight: 'bold'
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16
  },
  emptyIcon: {
    fontSize: 20,
  },
  footer: {
    height: 80
  }
});