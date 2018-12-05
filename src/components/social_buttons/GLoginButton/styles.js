import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export default StyleSheet.create({
  container: {
    width: 250,
    height: 48,
    elevation: 2,
    borderRadius: 2,
    justifyContent:'center',
    margin: 4
  },
  content: {
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.google
  },
  text: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 2
  }
});
