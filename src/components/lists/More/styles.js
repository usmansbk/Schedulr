import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

const SEPARATOR_HEIGHT = 1;
const HEADER_HEIGHT = 100;
const FOOTER_HEIGHT = 48;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.light_gray
  },
  header: {
    height: HEADER_HEIGHT
  },
  separator: {
    height: SEPARATOR_HEIGHT,
  },
  footer: {
    height: FOOTER_HEIGHT,
  }
})