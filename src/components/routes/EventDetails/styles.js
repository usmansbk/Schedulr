import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  date: {
    color: colors.gray,
    fontWeight: 'bold',
    fontSize: 16
  },
  status: {
    fontFamily: 'sans-serif-light',
    fontSize: 18,
  },
  head: {
    marginVertical: 16,
  },
  body: {
    marginVertical: 8
  },
  content: {
    marginHorizontal: 20,
    marginVertical: 8
  },
  label: {
    fontSize: 14,
    fontFamily: 'sans-serif-light',
    marginVertical: 2
  },
  value: {
    fontSize: 20,
    fontFamily: 'sans-serif-bold',
    fontWeight: 'bold',
  },
  item: {
    marginVertical: 12
  },
  nav: {
    color: colors.primary_light
  }
});