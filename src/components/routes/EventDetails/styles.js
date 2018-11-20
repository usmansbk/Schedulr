import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    color: colors.gray,
  },
  head: {
    marginVertical: 8,
  },
  content: {
    marginHorizontal: 16,
    marginVertical: 8
  },
  label: {
    fontSize: 16,
    fontFamily: 'sans-serif-light',
    textTransform: 'uppercase',
    marginVertical: 2
  },
  value: {
    fontSize: 16,
    fontFamily: 'sans-serif-bold',
  },
  item: {
    marginVertical: 8
  }
});