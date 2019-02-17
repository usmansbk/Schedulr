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
    color: colors.gray,
    fontFamily: 'sans-serif-bold'
  },
  primary: {
    color: colors.primary
  }
});
