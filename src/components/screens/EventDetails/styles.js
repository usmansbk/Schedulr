import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    paddingVertical: 4
  },
  date: {
    color: colors.gray,
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 4
  },
  headNote: {
    flexDirection: 'row'
  },
  status: {
    fontFamily: 'sans-serif-light',
    fontSize: 18,
  },
  note: {
    fontFamily: 'sans-serif-bold',
    color: colors.gray,
    fontWeight: 'bold'
  },
  head: {
    marginVertical: 8,
  },
  body: {
    marginVertical: 8
  },
  content: {
    marginHorizontal: 20,
    marginVertical: 4
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
  },
  red: {
    color: colors.light_red
  }
});