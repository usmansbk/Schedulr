import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const ITEM_HEIGHT = 150;
export const SEPERATOR_HEIGHT = 1;
export const SECTION_HEADER_HEIGHT = 80;

export default StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 56,
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
    fontSize: 48,
  }
});