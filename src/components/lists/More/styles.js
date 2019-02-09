import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

const SEPARATOR_HEIGHT = 1;
const HEADER_HEIGHT = 100;

export default StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.light_gray
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: 'white',
    marginVertical: 8,
  },
  separator: {
    height: SEPARATOR_HEIGHT,
  },
  footer: {
    backgroundColor: 'white',
    marginVertical: 8,
  },
  item: {
    backgroundColor: 'white',
  }
});
