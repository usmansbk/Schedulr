import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const AVATAR_SIZE = 32;
const SEPARATOR_HEIGHT = 4

export default StyleSheet.create({
  list: {
    backgroundColor: colors.light_gray
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 10
  },
  linkStyle: { color: '#2980b9' },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemLeft: {
    marginRight: 4
  },
  itemRight: {
    maxWidth: 300
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 16,
    width: 200
  },
  separator: {
    height: SEPARATOR_HEIGHT
  },
  footer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 8
  },
  footerText: {
    color: colors.gray,
    marginHorizontal: 8,
    fontWeight: 'bold'
  }
});
