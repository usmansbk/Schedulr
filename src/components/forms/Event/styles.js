import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

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
  date: {
    flexDirection: 'row',
  },
  button: {
    flexGrow: 1
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
  }
});
