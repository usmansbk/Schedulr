import { StyleSheet } from 'react-native';
import colors from '../../../config/styles';

export const AVATAR_SIZE = 80;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 16,
  },
  header: {
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headline: {
    fontSize: 27,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-bold'
  }
});
