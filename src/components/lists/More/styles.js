import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

const SEPARATOR_HEIGHT = 1;
const HEADER_HEIGHT = 100;

export const black = colors.black

export default StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.light_gray
  },
  contentContainer: {
    flexGrow: 1
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: colors.white,
    marginVertical: 8,
  },
  separator: {
    height: SEPARATOR_HEIGHT,
  },
  footer: {
    backgroundColor: colors.white,
    marginVertical: 8,
  },
  item: {
    backgroundColor: colors.white,
  }
});
