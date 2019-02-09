import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export default StyleSheet.create({
  list: {
    flex: 1
  },
  item: {
    width: '100%',
    height: 50,
    borderBottomColor: '#0002',
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 25,
    color: colors.light_gray_3,
    textAlign: 'center'
  },
  paragraph: {
    textAlign: 'center'
  },
})