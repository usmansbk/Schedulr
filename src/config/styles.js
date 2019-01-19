import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: 48,
    maxWidth: 48
  },
  iconButton: {
    marginRight: 0
  },
  badge: {
    color: colors.gray
  },
  header: {
    elevation: 0,
    backgroundColor: '#fff',
  },
  headerColor: {
    color: colors.gray
  },
});
