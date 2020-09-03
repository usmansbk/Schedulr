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
    backgroundColor: colors.google,
  },
  content: {
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 2,
    marginHorizontal: 8,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
    textAlign: 'center',
  },
});
