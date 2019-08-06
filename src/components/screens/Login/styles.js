import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.bg
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 32
  },
  h1: {
    fontSize: 27,
    color: colors.black
  },
  caption: {
    textAlign: 'center',
    color: colors.black
  }
});
