import { StyleSheet } from 'react-native';
import theme from '../../theme';

const backgroundColor = '#3f51b5';
const styles = StyleSheet.create({
  spacing: {
    marginVertical: 8,
  },
  checkbox: {
    paddingRight: 16,
    paddingVertical: 16,
  },
  fab: {
    backgroundColor,
  },
  error: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorText: {
    color: theme.red,
    marginVertical: 4,
  },
  text: {
    color: '#404040'
  },
});

export default styles;