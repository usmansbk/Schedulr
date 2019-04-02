import { StyleSheet } from 'react-native';
import colors from 'config/colors';

export const buttonTextColor = colors.black;
export const navButtonColor = colors.navButtonColor;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.bg
  },
  form: {
    margin: 16
  },
  text: {
    color: colors.primary,
    marginVertical: 8,
  },
  input: {
    marginVertical: 8,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  radioText: {
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 16
  },
  pickerSpacing: {
    marginVertical: 8
  },
  picker: {
    height: 48,
    color: colors.black
  },
  pickerItem: {
    color: colors.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.bg,
    paddingHorizontal: 16,
    elevation: 0,
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: colors.primary
  },
  checkboxItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
