import {StyleSheet} from 'react-native';
import colors from 'config/colors';

export default StyleSheet.create({
  container: {
    width: 250,
    height: 48,
    elevation: 2,
    borderRadius: 2,
    justifyContent: 'center',
    margin: 4,
    backgroundColor: colors.light_gray,
  },
  content: {
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 32,
    width: 32,
    marginHorizontal: 8,
  },
  text: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 4,
    textAlign: 'center',
  },
});
