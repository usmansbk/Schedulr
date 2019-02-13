import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export default StyleSheet.create({
  list: {
    // flex: 1,
    backgroundColor: colors.light_gray
  },
  contentContainer: {
    flexGrow: 1
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  paragraph: {
    textAlign: 'center'
  },
});