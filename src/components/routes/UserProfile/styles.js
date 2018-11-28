import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const AVATAR_SIZE = 120;

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
  }
});
