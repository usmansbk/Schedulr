import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 48,
  },
  header: {
    elevation: 2,
    backgroundColor: '#fff',
  },
  headerColor: {
    color: colors.gray
  },
});
