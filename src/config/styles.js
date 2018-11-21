import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  loginButton: {
    marginVertical: 4,
    width: 250,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  badge: {
    fontSize: 14,
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
