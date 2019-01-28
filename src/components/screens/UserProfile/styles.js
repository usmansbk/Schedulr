import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const AVATAR_SIZE = 200;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
    alignItems: 'center',
  },
  appbar: {
    elevation: 0,
    borderRadius: 0,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headline: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-bold',
    textAlign: 'center'
  },
  subheading: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  note: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.light_gray_3
  },
  caption: {
    fontSize: 16
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  footerText: {
    color: colors.gray,
    fontFamily: 'sans-serif-bold',
    fontSize: 20,
    fontWeight: 'bold'
  },
  count: {
    color: colors.light_gray_3,
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 8
  },
  itemText: {
    color: colors.light_gray_3,
    fontWeight: 'bold',
    fontSize: 20,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
