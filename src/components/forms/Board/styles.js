import { StyleSheet } from 'react-native';
import colors from 'config/colors';

export const navButtonColor = colors.navButtonColor;
export const placeholder = colors.placeholder;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.bg
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.bg,
    paddingHorizontal: 16,
    elevation: 0
  },
  form: {
    margin: 16
  },
  switchButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 4
  },
  text: {
    fontSize: 16,
    color: colors.placeholder,
    fontFamily: 'sans-serif-bold'
  },
  primary: {
    color: colors.primary
  }
});
