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
    marginHorizontal: 8
  },
  badge: {
    fontSize: 16,
    color: colors.gray
  }
});
