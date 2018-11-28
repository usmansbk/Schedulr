import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export default StyleSheet.create({
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