import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  icon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  badge: {
    fontSize: 16,
    color: colors.gray
  },
  header: {
    elevation: 2,
    backgroundColor: '#fff',
  },
  headerText: {
    color: colors.light_gray
  }
});
