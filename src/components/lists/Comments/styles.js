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
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fff',
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
    flex: 1,
    padding: 4,
    borderRadius: 2
  },
  authorName: {
    fontWeight: 'bold',
    color: colors.black
  },
  separator: {
    height: SEPARATOR_HEIGHT
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
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
    color: colors.gray,
    fontWeight: 'bold',
  },
});
