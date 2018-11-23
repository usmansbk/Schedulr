import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 48,
    maxWidth: 48,
  },
  badge: {
    color: colors.black
  },
  header: {
    elevation: 2,
    backgroundColor: '#fff',
  },
  headerText: {
    color: colors.light_gray
  }
});
