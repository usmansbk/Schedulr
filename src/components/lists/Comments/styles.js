import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const AVATAR_SIZE = 32;
export const primary = colors.primary;
const SEPARATOR_HEIGHT = 4;

export default StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: colors.light_gray,
  },
  itemContainer: {
    flex: 1,
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
    marginRight: 4,
    paddingTop: 10,
  },
  itemRight: {
    flex: 1,
    padding: 4,
    borderRadius: 2
  },
  authorName: {
    fontFamily: 'sans-serif-bold',
    color: colors.black,
    fontWeight: 'bold'
  },
  separator: {
    height: SEPARATOR_HEIGHT
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8
  },
  actions: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  replyBox: {
    backgroundColor: colors.light_gray,
    padding:4
  },
  replyName: {
    color: colors.gray,
    fontWeight: 'bold',
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
});
