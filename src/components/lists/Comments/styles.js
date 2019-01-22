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
    flex: 1
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  separator: {
    height: SEPARATOR_HEIGHT
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  actions: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  footerText: {
    color: colors.gray,
    marginHorizontal: 8,
    fontWeight: 'bold'
  },
  replyBox: {
    backgroundColor: colors.light_gray,
    padding:4
  },
  replyName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
