import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

const INPUT_WIDTH = 312;

export default StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: colors.light_gray_3,
    flexDirection: 'row',
  },
  left: {
    maxWidth: INPUT_WIDTH,
    minWidth: INPUT_WIDTH
  },
})