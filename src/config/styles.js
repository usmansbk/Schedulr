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
  header: {
    elevation: 2,
    backgroundColor: '#fff',
  },
  headerColor: {
    color: colors.gray
  },
});
