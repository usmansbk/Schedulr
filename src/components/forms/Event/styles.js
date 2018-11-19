import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const buttonTextColor = colors.black;
export const navButtonColor = colors.primary_light;

export default StyleSheet.create({
  container: {
    flex: 1
  },
  form: {
    margin: 16
  },
  text: {
    color: colors.primary,
    marginVertical: 8,
    fontWeight: 'bold'
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
    color: colors.primary,
    fontWeight: 'bold',
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
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    elevation: 2,
  }
});
