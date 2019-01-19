import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const navButtonColor = colors.primary_dark;

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    elevation: 0
  },
  form: {
    margin: 16
  },
  switchButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    color: colors.gray,
    fontFamily: 'sans-serif-light'
  }
});
