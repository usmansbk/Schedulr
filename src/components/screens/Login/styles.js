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
    fontWeight: 'bold',
    color: colors.black
  },
  grayed: {
    marginVertical: 8,
    color: colors.gray,
    fontWeight: 'bold'
  },
  caption: {
    textAlign: 'center'
  }
});
