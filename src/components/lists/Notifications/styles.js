import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export default StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 27,
    color: colors.light_gray_3,
    fontWeight: 'bold'
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